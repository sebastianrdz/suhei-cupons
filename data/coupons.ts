export type CouponCategory = "Actividades" | "Comida" | "Extras";

export interface Coupon {
  id: string;
  category: CouponCategory;
  title: string;
  subtitle: string;
  description: string;
  special?: boolean;
}

export const coupons: Coupon[] = [
  // Actividades
  {
    id: "picnic-parque",
    category: "Actividades",
    title: "Picnic contigo 🧺",
    subtitle: "Tu comida favorita + cobija + vista bonita.",
    description:
      "Preparamos juntos un picnic con tus snacks y postres favoritos, buscamos un lugar bonito y pasamos la tarde platicando, jugando cartas y tomando fotos.",
  },
  {
    id: "playa-dia",
    category: "Actividades",
    title: "Día de playa 🏖️",
    subtitle: "Sol, mar y cero prisas.",
    description:
      "Un día completo en la playa: caminatas, fotos, meternos al mar si se antoja y terminar viendo el atardecer abrazados.",
    special: true,
  },
  {
    id: "taller-reposteria",
    category: "Actividades",
    title: "Taller de repostería juntos 🍰",
    subtitle: "Harina, risas y mucho azúcar.",
    description:
      "Buscamos un taller de repostería o armamos uno en casa. El objetivo: ensuciarnos de harina, hacer postres deliciosos y comérnoslos viendo una peli.",
  },
  {
    id: "cabanas-santiago",
    category: "Actividades",
    title: "Escapada a cabañas en Santiago 🌲",
    subtitle: "Fugitivos de la ciudad por un ratito.",
    description:
      "Un fin de semana en cabañas en Santiago: fogata, vino, juegos de mesa y dormirnos escuchando la naturaleza.",
  },
  {
    id: "paseo-santa-lucia",
    category: "Actividades",
    title: "Paseo Santa Lucía de noche 🌌",
    subtitle: "Barquitos, luces y fotos.",
    description:
      "Un paseo por Santa Lucía, ya sea caminando o en bote, con fotos, plática y una parada para cenar algo rico cerca.",
  },
  {
    id: "ciudad-de-mexico",
    category: "Actividades",
    title: "Viaje a la Ciudad de México 🇲🇽",
    subtitle: "Aventura, cultura y amor.",
    description:
      "Vamos a acomodar una escapada a la CDMX, ya sea por fin de semana o por días, para disfrutar de la vida, la cultura y el amor.",
    special: true,
  },
  {
    id: "movies-date",
    category: "Actividades",
    title: "Vamooos al cinee",
    subtitle: "Tu, yo, una peli... no se piensalo.",
    description:
      "Vamos a ver una película, no importa cuál, no importa dónde. Lo importante es estar juntos y disfrutar del cine.",
  },

  // Comida
  {
    id: "jardin-sucre-date",
    category: "Comida",
    title: "Cita dulce en Jardín Sucre 🍰",
    subtitle: "Postres, café y tú.",
    description:
      "Una tarde en Jardín Sucre probando postres y café, platicando de todo y de nada, y quedándonos el tiempo que queramos.",
  },
  {
    id: "pizza-night",
    category: "Comida",
    title: "Noche de pizza 🍕",
    subtitle: "Pedimos o preparamos, pero juntos.",
    description:
      "Elegimos una pizza (o la preparamos en casa), ponemos música o una peli y la disfrutamos en modo pijama y cobija.",
  },
  {
    id: "pasta-date",
    category: "Comida",
    title: "Cena de pasta 🍝",
    subtitle: "Pasta, vino y velitas.",
    description:
      "Preparamos pasta juntos o salimos a un restaurante, pero con velitas, buena plática y cero celulares.",
  },
  {
    id: "carls-jr-date",
    category: "Comida",
    title: "Carls Jr. date 🍔",
    subtitle: "Hamburguesas, papas y tu.",
    description:
      "Vamos a comer hamburguesas en Carls Jr., pedimos papas, refrescos y nos sentamos a platicar de todo y de nada.",
  },
  {
    id: "sushi-date",
    category: "Comida",
    title: "Sushi night 🍣",
    subtitle: "Tu sabes que me encanta el sushi.",
    description:
      "Noche de sushi en nuestro lugar favorito o probando uno nuevo, contando historias y soñando planes.",
    special: true,
  },
  {
    id: "yamassan-date",
    category: "Comida",
    title: "Yamassan Ramen 🇯🇵",
    subtitle: "Un buen rameen con este friooo.",
    description:
      "Una salida especial a Yamassan para comer rico, probando platillos nuevos y compartiendo todo al centro.",
  },
  {
    id: "burger-tfb",
    category: "Comida",
    title: "Hamburguesas TFB 🍔",
    subtitle: "Cheat meal contigo. Este te encanta a ti.",
    description:
      "Ir por hamburguesas a TFB, pedir lo que se nos antoje y caminar tantito después para bajar la comida.",
    special: true,
  },
  {
    id: "brunch-domingo",
    category: "Comida",
    title: "Brunch de domingo 🥞",
    subtitle: "Si despues de correr jejeje",
    description:
      "Buscar un lugar bonito para brunch, pedir café, hotcakes o chilaquiles y quedarnos platicando hasta que nos corran.",
  },
  {
    id: "chilaquiles-date",
    category: "Comida",
    title: "Chilaquiles date 🌮",
    subtitle: "Desayuno despues de correr",
    description:
      "Buscar un lugar bonito para comer chilaquiles, pedir café, hotcakes o chilaquiles y quedarnos platicando hasta que nos corran.",
  },
  {
    id: "tacos-date",
    category: "Comida",
    title: "Tacos date 🌮",
    subtitle: "Los Tacos que stan por mi caasaaaaa esta deliciosooooos",
    description:
      "No ay descripcion. Tu ya sabes jejeje.",
  },
  {
    id: "protein-cinamons",
    category: "Comida",
    title: "Protein Cinnamon Roll 🥐",
    subtitle: "Protein + Cinnamon Roll = Perfection.",
    description:
      "Hacer ahora si los cinamos que tanto te eh dicho que hagamos jejeje.",
  },
  {
    id: "ice-cream",
    category: "Comida",
    title: "Helado date 🍦",
    subtitle: "Nive y el anochecer.",
    description:
      "Vamos por helado y vemos el anochecer.",
  },

  // Extras
  {
    id: "besos-ilimitados",
    category: "Extras",
    title: "Cupón de besos ilimitados 😘",
    subtitle: "Válido 24/7, sin fecha de expiración.",
    description:
      "Cuando uses este cupón, te debo una sesión absurda de besos, abrazos y cariñitos sin decir que no.",
    special: true,
  },
  {
    id: "maraton-series",
    category: "Extras",
    title: "Maratón de serie 🛋️",
    subtitle: "Tú eliges la serie, yo pongo los snacks. Se que te encantaaaaaa Harry Potter.",
    description:
      "Un día o noche para ver la serie que tú quieras, con snacks y cobija.",
  },
  {
    id: "noche-juegos",
    category: "Extras",
    title: "Noche de juegos de mesa 🎲",
    subtitle: "Competencia sana (o no tanto).",
    description:
      "Sacar los juegos de mesa, preparar botanas y pasar la noche jugando, riendo y apostando cosas tontas.",
  },
  {
    id: "basquet",
    category: "Extras",
    title: "Partido de basquetbol con mi hermana 🏀",
    subtitle: "Tu y yo contra mi hermana.",
    description:
      "Un partido de basquetbol en el parque, tu y yo contra mi hermana. No importa si ganamos o perdemos, lo importante es estar juntos.",
  }
];

