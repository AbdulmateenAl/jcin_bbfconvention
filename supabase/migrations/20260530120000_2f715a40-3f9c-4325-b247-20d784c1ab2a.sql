-- Food option enum and registration column
CREATE TYPE public.food_option AS ENUM ('amala_and_ewedu', 'semo_and_egwusi', 'ofada_rice');

ALTER TABLE public.registrations
  ADD COLUMN food_option food_option NOT NULL DEFAULT 'amala_and_ewedu';
