-- Run this in the Supabase SQL editor to set up the schema

-- Coupons table
create table public.coupons (
  id          text primary key,
  category    text not null check (category in ('Actividades', 'Comida', 'Extras')),
  title       text not null,
  subtitle    text not null,
  description text not null,
  special     boolean not null default false,
  redeemed    boolean not null default false,
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- Auto-update updated_at on row changes
create or replace function public.handle_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger coupons_updated_at
  before update on public.coupons
  for each row execute function public.handle_updated_at();

-- RLS
alter table public.coupons enable row level security;

-- Guests (anon) and logged-in users can read all coupons
create policy "Public read"
  on public.coupons for select
  to anon, authenticated
  using (true);

-- Guests (anon) can toggle the redeemed field
create policy "Guest update redeemed"
  on public.coupons for update
  to anon
  using (true) with check (true);

-- Only authenticated admin can write
create policy "Admin insert"
  on public.coupons for insert
  to authenticated
  with check (true);

create policy "Admin update"
  on public.coupons for update
  to authenticated
  using (true) with check (true);

create policy "Admin delete"
  on public.coupons for delete
  to authenticated
  using (true);

-- ────────────────────────────────────────────────
-- Seed data — all 26 coupons from the original app
-- ────────────────────────────────────────────────
insert into public.coupons (id, category, title, subtitle, description, special, sort_order) values
  ('picnic-parque', 'Actividades', 'Picnic contigo 🧺', 'Tu comida favorita + cobija + vista bonita.', 'Preparamos juntos un picnic con tus snacks y postres favoritos, buscamos un lugar bonito y pasamos la tarde platicando, jugando cartas y tomando fotos.', false, 1),
  ('playa-dia', 'Actividades', 'Día de playa 🏖️', 'Sol, mar y cero prisas.', 'Un día completo en la playa: caminatas, fotos, meternos al mar si se antoja y terminar viendo el atardecer abrazados.', true, 2),
  ('taller-reposteria', 'Actividades', 'Taller de repostería juntos 🍰', 'Harina, risas y mucho azúcar.', 'Buscamos un taller de repostería o armamos uno en casa. El objetivo: ensuciarnos de harina, hacer postres deliciosos y comérnoslos viendo una peli.', false, 3),
  ('cabanas-santiago', 'Actividades', 'Escapada a cabañas en Santiago 🌲', 'Fugitivos de la ciudad por un ratito.', 'Un fin de semana en cabañas en Santiago: fogata, vino, juegos de mesa y dormirnos escuchando la naturaleza.', false, 4),
  ('paseo-santa-lucia', 'Actividades', 'Paseo Santa Lucía de noche 🌌', 'Barquitos, luces y fotos.', 'Un paseo por Santa Lucía, ya sea caminando o en bote, con fotos, plática y una parada para cenar algo rico cerca.', false, 5),
  ('ciudad-de-mexico', 'Actividades', 'Viaje a la Ciudad de México 🇲🇽', 'Aventura, cultura y amor.', 'Vamos a acomodar una escapada a la CDMX, ya sea por fin de semana o por días, para disfrutar de la vida, la cultura y el amor.', true, 6),
  ('movies-date', 'Actividades', 'Vamooos al cinee', 'Tu, yo, una peli... no se piensalo.', 'Vamos a ver una película, no importa cuál, no importa dónde. Lo importante es estar juntos y disfrutar del cine.', false, 7),
  ('legos-date', 'Actividades', 'Unos legos y ver la f1 uffff', 'y si construimos un carro de la formula 1 👀', 'Vamos a construir algo juntos, no importa cuál sea la pieza, no importa cuánto tiempo tarde. Lo importante es estar juntos y disfrutar del juego.', true, 8),
  ('luzes-obispado', 'Actividades', 'Las Luzes del Obispado jeje🌌', 'Aprovechar la temporada navideña', 'Vamos a ver las luces del obispado, caminar un poco, comer algo rico y disfrutar de la navidad.', false, 9),
  ('jardin-sucre-date', 'Comida', 'Cita dulce en Jardín Sucre 🍰', 'Postres, café y tú.', 'Una tarde en Jardín Sucre probando postres y café, platicando de todo y de nada, y quedándonos el tiempo que queramos.', false, 10),
  ('pizza-night', 'Comida', 'Noche de pizza 🍕', 'Pedimos o preparamos, pero juntos.', 'Elegimos una pizza (o la preparamos en casa), ponemos música o una peli y la disfrutamos en modo pijama y cobija.', false, 11),
  ('pasta-date', 'Comida', 'Cena de pasta 🍝', 'Pasta, vino y velitas.', 'Preparamos pasta juntos o salimos a un restaurante, pero con velitas, buena plática y cero celulares.', false, 12),
  ('carls-jr-date', 'Comida', 'Carls Jr. date 🍔', 'Hamburguesas, papas y tu.', 'Vamos a comer hamburguesas en Carls Jr., pedimos papas, refrescos y nos sentamos a platicar de todo y de nada.', false, 13),
  ('sushi-date', 'Comida', 'Sushi night 🍣', 'Tu sabes que me encanta el sushi.', 'Noche de sushi en nuestro lugar favorito o probando uno nuevo, contando historias y soñando planes.', true, 14),
  ('yamassan-date', 'Comida', 'Yamassan Ramen 🇯🇵', 'Un buen rameen con este friooo.', 'Una salida especial a Yamassan para comer rico, probando platillos nuevos y compartiendo todo al centro.', false, 15),
  ('burger-tfb', 'Comida', 'Hamburguesas TFB 🍔', 'Cheat meal contigo. Este te encanta a ti.', 'Ir por hamburguesas a TFB, pedir lo que se nos antoje y caminar tantito después para bajar la comida.', true, 16),
  ('brunch-domingo', 'Comida', 'Brunch de domingo 🥞', 'Si despues de correr jejeje', 'Buscar un lugar bonito para brunch, pedir café, hotcakes o chilaquiles y quedarnos platicando hasta que nos corran.', false, 17),
  ('chilaquiles-date', 'Comida', 'Chilaquiles date 🌮', 'Desayuno despues de correr', 'Buscar un lugar bonito para comer chilaquiles, pedir café, hotcakes o chilaquiles y quedarnos platicando hasta que nos corran.', false, 18),
  ('tacos-date', 'Comida', 'Tacos date 🌮', 'Los Tacos que stan por mi caasaaaaa esta deliciosooooos', 'No ay descripcion. Tu ya sabes jejeje.', false, 19),
  ('protein-cinamons', 'Comida', 'Protein Cinnamon Roll 🥐', 'Protein + Cinnamon Roll = Perfection.', 'Hacer ahora si los cinamos que tanto te eh dicho que hagamos jejeje.', false, 20),
  ('ice-cream', 'Comida', 'Helado date 🍦', 'Nive y el anochecer.', 'Vamos por helado y vemos el anochecer.', false, 21),
  ('cookies', 'Comida', 'Galletas NY 🍪', 'Unas asi bien buenas como las de NY', 'Vamos a hacer unas muy buenas galletas jejeje.', true, 22),
  ('besos-ilimitados', 'Extras', 'Cupón de besos ilimitados 😘', 'Válido 24/7, sin fecha de expiración.', 'Cuando uses este cupón, te debo una sesión absurda de besos, abrazos y cariñitos sin decir que no.', true, 23),
  ('maraton-series', 'Extras', 'Maratón de serie 🛋️', 'Tú eliges la serie, yo pongo los snacks. Se que te encantaaaaaa Harry Potter.', 'Un día o noche para ver la serie que tú quieras, con snacks y cobija.', false, 24),
  ('noche-juegos', 'Extras', 'Noche de juegos de mesa 🎲', 'Competencia sana (o no tanto).', 'Sacar los juegos de mesa, preparar botanas y pasar la noche jugando, riendo y apostando cosas tontas.', false, 25),
  ('basquet', 'Extras', 'Partido de basquetbol con mi hermana 🏀', 'Tu y yo contra mi hermana.', 'Un partido de basquetbol en el parque, tu y yo contra mi hermana. No importa si ganamos o perdemos, lo importante es estar juntos.', false, 26);

-- ────────────────────────────────────────────────
-- Migration: add redeemed column (run on existing databases)
-- ────────────────────────────────────────────────
-- alter table public.coupons add column if not exists redeemed boolean not null default false;
-- create policy "Guest update redeemed" on public.coupons for update to anon using (true) with check (true);

-- ────────────────────────────────────────────────
-- Migration: coupon images (run in Supabase SQL editor)
-- ────────────────────────────────────────────────
-- 1. Add image_urls column
-- alter table public.coupons add column if not exists image_urls text[] not null default '{}';

-- 2. Create public storage bucket
-- insert into storage.buckets (id, name, public) values ('coupon-images', 'coupon-images', true)
--   on conflict (id) do nothing;

-- 3. Storage RLS policies
-- create policy "Public read coupon images"
--   on storage.objects for select
--   to anon, authenticated
--   using (bucket_id = 'coupon-images');

-- create policy "Anyone upload coupon images"
--   on storage.objects for insert
--   to anon, authenticated
--   with check (bucket_id = 'coupon-images');

-- create policy "Admin delete coupon images"
--   on storage.objects for delete
--   to authenticated
--   using (bucket_id = 'coupon-images');
