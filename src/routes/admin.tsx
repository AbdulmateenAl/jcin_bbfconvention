import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import {
  listRegistrations,
  updateRegistrationStatus,
  getReceiptUrl,
  isCurrentUserAdmin,
} from "@/lib/admin.functions";
import { CheckCircle2, Flag, Clock, FileImage, LogOut, Download } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard — JCIN UNILORIN Convention" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const nav = useNavigate();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let sub: { unsubscribe: () => void } | undefined;
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) nav({ to: "/login" });
      else setReady(true);
    });
    const { data } = supabase.auth.onAuthStateChange((_e, s) => {
      if (!s) nav({ to: "/login" });
    });
    sub = data.subscription;
    return () => sub?.unsubscribe();
  }, [nav]);

  if (!ready) return null;
  return <Dashboard />;
}

function Dashboard() {
  const qc = useQueryClient();
  const nav = useNavigate();
  const fetchList = useServerFn(listRegistrations);
  const checkAdmin = useServerFn(isCurrentUserAdmin);
  const update = useServerFn(updateRegistrationStatus);
  const getUrl = useServerFn(getReceiptUrl);

  const adminQ = useQuery({ queryKey: ["isAdmin"], queryFn: () => checkAdmin() });
  const listQ = useQuery({
    queryKey: ["registrations"],
    queryFn: () => fetchList(),
    enabled: adminQ.data?.isAdmin === true,
  });

  const mut = useMutation({
    mutationFn: (vars: { id: string; status: "pending" | "approved" | "flagged" }) =>
      update({ data: vars }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["registrations"] });
      toast.success("Updated");
    },
    onError: (e: any) => toast.error(e.message ?? "Failed"),
  });

  const viewReceipt = async (path: string) => {
    try {
      const { url } = await getUrl({ data: { path } });
      window.open(url, "_blank", "noopener");
    } catch (e: any) {
      toast.error(e.message ?? "Could not load receipt");
    }
  };

  const exportCSV = () => {
    const rows = listQ.data?.registrations ?? [];
    const headers = [
      "id","full_name","email","phone","family_group","jci_member",
      "purchasing_aso_oke","attending_after_party","attending_picnic",
      "verification_status","created_at","admin_notes","receipt_path",
    ];
    const csv = [
      headers.join(","),
      ...rows.map((r: any) =>
        headers.map((h) => {
          const v = r[h];
          const s = v == null ? "" : String(v).replace(/"/g, '""');
          return `"${s}"`;
        }).join(","),
      ),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `registrations-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    nav({ to: "/login" });
  };

  if (adminQ.isLoading) {
    return <div className="min-h-screen grid place-items-center text-muted-foreground">Loading…</div>;
  }

  if (!adminQ.data?.isAdmin) {
    return (
      <div className="min-h-screen grid place-items-center px-6">
        <div className="max-w-md text-center space-y-4">
          <h1 className="font-display text-3xl">Not an admin</h1>
          <p className="text-sm text-muted-foreground">
            Your account is signed in but has no admin role. Ask the platform owner to grant your user
            the <code className="px-1.5 py-0.5 rounded bg-muted">admin</code> role in the user_roles table.
          </p>
          <div className="flex gap-2 justify-center">
            <Button asChild variant="outline"><Link to="/">Back to site</Link></Button>
            <Button onClick={signOut}>Sign out</Button>
          </div>
        </div>
      </div>
    );
  }

  const rows = listQ.data?.registrations ?? [];
  const stats = {
    total: rows.length,
    pending: rows.filter((r: any) => r.verification_status === "pending").length,
    approved: rows.filter((r: any) => r.verification_status === "approved").length,
    flagged: rows.filter((r: any) => r.verification_status === "flagged").length,
  };

  return (
    <div className="min-h-screen bg-gradient-soft">
      <header className="border-b border-border bg-card/80 backdrop-blur sticky top-0 z-30">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">JCIN UNILORIN</div>
            <h1 className="font-display text-2xl">Convention Dashboard</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={exportCSV}>
              <Download className="h-4 w-4 mr-2" /> Export CSV
            </Button>
            <Button variant="ghost" size="sm" onClick={signOut}>
              <LogOut className="h-4 w-4 mr-2" /> Sign out
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8 space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Stat label="Total" value={stats.total} />
          <Stat label="Pending" value={stats.pending} tone="muted" />
          <Stat label="Approved" value={stats.approved} tone="accent" />
          <Stat label="Flagged" value={stats.flagged} tone="wine" />
        </div>

        <div className="rounded-3xl border border-border bg-card overflow-hidden shadow-soft">
          {listQ.isLoading ? (
            <div className="p-10 text-center text-muted-foreground">Loading registrations…</div>
          ) : rows.length === 0 ? (
            <div className="p-10 text-center text-muted-foreground">No registrations yet.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="text-left p-4">Attendee</th>
                    <th className="text-left p-4">Contact</th>
                    <th className="text-left p-4">Add-ons</th>
                    <th className="text-left p-4">Status</th>
                    <th className="text-right p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r: any) => (
                    <tr key={r.id} className="border-t border-border align-top hover:bg-muted/20">
                      <td className="p-4">
                        <div className="font-medium">{r.full_name}</div>
                        <div className="text-xs text-muted-foreground">
                          {r.family_group ?? "—"} · {r.jci_member ? "Member" : "Non-member"}
                        </div>
                        <div className="text-[11px] text-muted-foreground mt-1">
                          {new Date(r.created_at).toLocaleString()}
                        </div>
                      </td>
                      <td className="p-4">
                        <div>{r.email}</div>
                        <div className="text-xs text-muted-foreground">{r.phone}</div>
                      </td>
                      <td className="p-4 space-y-1 text-xs">
                        {r.purchasing_aso_oke && <Tag>Aso-Oke</Tag>}
                        {r.attending_after_party && <Tag>After Party</Tag>}
                        {r.attending_picnic && <Tag>Picnic</Tag>}
                      </td>
                      <td className="p-4">
                        <StatusBadge status={r.verification_status} />
                      </td>
                      <td className="p-4 text-right whitespace-nowrap space-x-1">
                        <Button size="sm" variant="outline" onClick={() => viewReceipt(r.receipt_path)}>
                          <FileImage className="h-3.5 w-3.5 mr-1" /> Receipt
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          disabled={mut.isPending}
                          onClick={() => mut.mutate({ id: r.id, status: "approved" })}
                        >
                          <CheckCircle2 className="h-3.5 w-3.5 mr-1 text-accent" /> Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          disabled={mut.isPending}
                          onClick={() => mut.mutate({ id: r.id, status: "flagged" })}
                        >
                          <Flag className="h-3.5 w-3.5 mr-1 text-wine" /> Flag
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
      <Toaster richColors position="top-center" />
    </div>
  );
}

function Stat({ label, value, tone }: { label: string; value: number; tone?: "muted" | "accent" | "wine" }) {
  const color = tone === "accent" ? "text-accent" : tone === "wine" ? "text-wine" : tone === "muted" ? "text-muted-foreground" : "text-gradient";
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
      <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{label}</div>
      <div className={`font-display text-4xl mt-1 ${color}`}>{value}</div>
    </div>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return <span className="inline-block rounded-full bg-accent/10 text-accent px-2 py-0.5 text-[10px] mr-1 mb-1">{children}</span>;
}

function StatusBadge({ status }: { status: "pending" | "approved" | "flagged" }) {
  const map = {
    pending: { icon: Clock, cls: "bg-muted text-muted-foreground" },
    approved: { icon: CheckCircle2, cls: "bg-accent/10 text-accent" },
    flagged: { icon: Flag, cls: "bg-wine/10 text-wine" },
  } as const;
  const Icon = map[status].icon;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${map[status].cls}`}>
      <Icon className="h-3 w-3" /> {status}
    </span>
  );
}
