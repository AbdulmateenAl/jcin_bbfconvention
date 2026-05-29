import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { CONVENTION } from "@/lib/convention";
import { Building2, Copy, Upload, CheckCircle2, ExternalLink } from "lucide-react";

const schema = z.object({
  full_name: z.string().trim().min(2, "Enter your full name").max(120),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().min(7, "Enter a valid phone").max(32),
  family_group: z.string().trim().max(120).optional().or(z.literal("")),
});

const ACCEPTED = ["image/jpeg", "image/jpg", "image/png", "application/pdf"];
const MAX_BYTES = 5 * 1024 * 1024;

type RegistrationFormType = "member" | "non-member";

const FORM_CONFIG: Record<RegistrationFormType, { title: string; subtitle: string }> = {
  member: {
    title: "JCI member registration",
    subtitle: "Complete the member registration details below to reserve your seat.",
  },
  "non-member": {
    title: "General registration",
    subtitle: "Complete the non-member registration details below to reserve your seat.",
  },
};

const SCREENING_OPTIONS: Array<{ value: RegistrationFormType; label: string }> = [
  { value: "member", label: "Yes" },
  { value: "non-member", label: "No" },
];

export function Registration() {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [screening, setScreening] = useState<RegistrationFormType | null>(null);
  const [step, setStep] = useState<"screening" | "details">("screening");
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    family_group: "",
    jci_member: false,
    purchasing_aso_oke: false,
    attending_after_party: true,
    attending_picnic: true,
  });

  const selectedConfig = screening ? FORM_CONFIG[screening] : null;
  const screeningPanelRef = useRef<HTMLDivElement>(null);
  const detailsPanelRef = useRef<HTMLDivElement>(null);
  const [panelHeight, setPanelHeight] = useState<string>("auto");

  const updatePanelHeight = () => {
    const activePanel = step === "screening" ? screeningPanelRef.current : detailsPanelRef.current;
    if (activePanel) {
      setPanelHeight(`${activePanel.offsetHeight}px`);
    }
  };

  useEffect(() => {
    updatePanelHeight();
  }, [step, screening, form.full_name, form.email, form.phone, form.family_group, form.purchasing_aso_oke, form.attending_after_party, form.attending_picnic, file]);

  const handleNext = () => {
    if (!screening) return;
    setForm((prev) => ({ ...prev, jci_member: screening === "member" }));
    setStep("details");
  };

  const copy = async (v: string) => {
    await navigator.clipboard.writeText(v);
    toast.success("Copied to clipboard");
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Check your details");
      return;
    }
    if (!file) {
      toast.error("Please upload your payment receipt");
      return;
    }
    if (!ACCEPTED.includes(file.type)) {
      toast.error("Receipt must be JPG, PNG or PDF");
      return;
    }
    if (file.size > MAX_BYTES) {
      toast.error("Receipt must be 5MB or smaller");
      return;
    }

    setSubmitting(true);
    try {
      const ext = file.name.split(".").pop()?.toLowerCase() ?? "bin";
      const safe = parsed.data.full_name.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 40);
      const path = `${new Date().getFullYear()}/${Date.now()}-${safe}.${ext}`;

      const up = await supabase.storage.from("receipts").upload(path, file, {
        contentType: file.type,
        upsert: false,
      });
      if (up.error) throw up.error;

      const ins = await supabase.from("registrations").insert({
        full_name: parsed.data.full_name,
        email: parsed.data.email,
        phone: parsed.data.phone,
        family_group: parsed.data.family_group || null,
        jci_member: form.jci_member,
        purchasing_aso_oke: form.purchasing_aso_oke,
        attending_after_party: form.attending_after_party,
        attending_picnic: form.attending_picnic,
        receipt_path: up.data.path,
      });
      if (ins.error) throw ins.error;

      setSuccess(true);
    } catch (err) {
      console.error(err);
      toast.error("Could not submit. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <section id="register" className="relative py-24 md:py-32">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-accent mb-6">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl">You're in.</h2>
          <p className="mt-4 text-muted-foreground">
            We've received your registration and receipt. Our team will verify your payment shortly.
            Join the official WhatsApp group to stay in the loop.
          </p>
          <Button asChild size="lg" className="bg-gradient-rich text-primary-foreground mt-8 shadow-elegant">
            <a href={CONVENTION.whatsappGroupUrl} target="_blank" rel="noreferrer">
              Join Official WhatsApp Group <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section id="register" className="relative py-24 md:py-32 bg-gradient-soft">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <div className="text-xs uppercase tracking-[0.22em] text-wine">Registration</div>
          <h2 className="font-display text-4xl md:text-5xl mt-3">Reserve your seat</h2>
          <p className="mt-4 text-muted-foreground">
            Pay by bank transfer using the details below, then complete the form and upload your receipt.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-8 mt-12">
          {/* Payment card */}
          <aside className="rounded-3xl border border-border bg-card p-7 shadow-soft h-fit">
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Building2 className="h-5 w-5" />
            </div>
            <h3 className="font-display text-2xl mt-5">Payment details</h3>
            <dl className="mt-5 space-y-4 text-sm">
              {[
                ["Bank", CONVENTION.payment.bankName],
                ["Account name", CONVENTION.payment.accountName],
                ["Account number", CONVENTION.payment.accountNumber],
                ["Amount", CONVENTION.payment.amount],
              ].map(([k, v]) => (
                <div key={k} className="flex items-start justify-between gap-3 border-b border-border pb-3 last:border-0">
                  <div>
                    <dt className="text-muted-foreground text-xs uppercase tracking-wider">{k}</dt>
                    <dd className="font-medium mt-1">{v}</dd>
                  </div>
                  <button
                    type="button"
                    onClick={() => copy(v)}
                    className="shrink-0 inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border hover:bg-accent/10"
                    aria-label={`Copy ${k}`}
                  >
                    <Copy className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </dl>
          </aside>

          <div
            className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft"
            style={{ height: panelHeight, transition: "height 200ms ease-out" }}
          >
            <div
              className="flex items-start w-[200%] transition-transform duration-500 ease-out"
              style={{ transform: step === "screening" ? "translateX(0)" : "translateX(-50%)" }}
            >
              <div ref={screeningPanelRef} className="flex-none w-1/2 p-7">
                <div className="space-y-6">
                  <div>
                    <div className="text-xs uppercase tracking-[0.22em] text-wine">Pre-screening</div>
                    <h3 className="font-display text-4xl mt-3">Are you a JCI member?</h3>
                    <p className="mt-4 text-muted-foreground">
                      Select your membership status and continue to the registration form tailored for you.
                    </p>
                  </div>

                  <RadioGroup
                    value={screening ?? undefined}
                    onValueChange={(value) => setScreening(value as RegistrationFormType)}
                    className="grid gap-3"
                  >
                    {SCREENING_OPTIONS.map((option) => (
                      <label
                        key={option.value}
                        className={
                          "flex items-center gap-4 rounded-3xl border border-border bg-background/80 px-4 py-4 hover:border-accent transition"
                        }
                      >
                        <RadioGroupItem value={option.value} />
                        <span className="text-base font-medium">{option.label}</span>
                      </label>
                    ))}
                  </RadioGroup>

                  <Button
                    type="button"
                    onClick={handleNext}
                    disabled={!screening}
                    size="lg"
                    className="self-start bg-gradient-rich text-primary-foreground hover:opacity-95 shadow-elegant"
                  >
                    Next
                  </Button>
                </div>
              </div>

              <div ref={detailsPanelRef} className="flex-none w-1/2 p-7">
                <form onSubmit={onSubmit} className="space-y-5">
                  <div>
                    <div className="text-xs uppercase tracking-[0.22em] text-wine">Registration</div>
                    <h3 className="font-display text-4xl mt-3">{selectedConfig?.title ?? "Registration details"}</h3>
                    <p className="mt-4 text-muted-foreground">{selectedConfig?.subtitle ?? "Fill out your details to complete registration."}</p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field id="full_name" label="Full name" required>
                      <Input
                        id="full_name"
                        value={form.full_name}
                        maxLength={120}
                        required
                        onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                      />
                    </Field>
                    <Field id="email" label="Email" required>
                      <Input
                        id="email"
                        type="email"
                        value={form.email}
                        maxLength={255}
                        required
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                      />
                    </Field>
                    <Field id="phone" label="Phone" required>
                      <Input
                        id="phone"
                        type="tel"
                        value={form.phone}
                        maxLength={32}
                        required
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      />
                    </Field>
                    <Field id="family_group" label="Family / Group">
                      <Input
                        id="family_group"
                        value={form.family_group}
                        maxLength={120}
                        onChange={(e) => setForm({ ...form, family_group: e.target.value })}
                      />
                    </Field>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3 pt-2">
                    <Toggle
                      checked={form.purchasing_aso_oke}
                      onCheckedChange={(v) => setForm({ ...form, purchasing_aso_oke: v })}
                      label="I want the Aso-Oke add-on"
                    />
                    <Toggle
                      checked={form.attending_after_party}
                      onCheckedChange={(v) => setForm({ ...form, attending_after_party: v })}
                      label="Attending the After Party"
                    />
                    <Toggle
                      checked={form.attending_picnic}
                      onCheckedChange={(v) => setForm({ ...form, attending_picnic: v })}
                      label="Attending the Recovery Picnic"
                    />
                  </div>

                  <div>
                    <Label className="text-xs uppercase tracking-wider text-muted-foreground">Payment receipt</Label>
                    <label className="mt-2 flex items-center gap-3 rounded-2xl border border-dashed border-border bg-background/60 p-4 cursor-pointer hover:border-accent transition">
                      <Upload className="h-5 w-5 text-accent" />
                      <div className="flex-1 text-sm">
                        {file ? (
                          <span className="font-medium">{file.name}</span>
                        ) : (
                          <span className="text-muted-foreground">Upload JPG, PNG or PDF · max 5MB</span>
                        )}
                      </div>
                      <input
                        type="file"
                        accept=".jpg,.jpeg,.png,.pdf,image/jpeg,image/png,application/pdf"
                        className="hidden"
                        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                      />
                    </label>
                  </div>

                  <Button
                    type="submit"
                    disabled={submitting}
                    size="lg"
                    className="w-full bg-gradient-rich text-primary-foreground hover:opacity-95 shadow-elegant"
                  >
                    {submitting ? "Submitting…" : "Submit Registration"}
                  </Button>
                  <p className="text-[11px] text-muted-foreground text-center">
                    By submitting, you consent to {CONVENTION.org} contacting you about the convention.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ id, label, required, children }: { id: string; label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <Label htmlFor={id} className="text-xs uppercase tracking-wider text-muted-foreground">
        {label}{required && <span className="text-wine ml-1">*</span>}
      </Label>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}

function Toggle({ checked, onCheckedChange, label }: { checked: boolean; onCheckedChange: (v: boolean) => void; label: string }) {
  return (
    <label className="flex items-center gap-3 rounded-2xl border border-border bg-background/60 px-4 py-3 cursor-pointer hover:border-accent transition">
      <Checkbox checked={checked} onCheckedChange={(v) => onCheckedChange(Boolean(v))} />
      <span className="text-sm">{label}</span>
    </label>
  );
}
