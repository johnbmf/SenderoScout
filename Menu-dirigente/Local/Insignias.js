const Insignias = [
    {
        Id : 1,
        Nombre: 'Guitarra',
        Tag: ["Musica", "Instrumento"],
        Familia: "",
        Icon : require('../assets/Insignias/acoustic-guitar.png'),
        Descripcion: "Solo los guitarristas mas avezados son dignos de esta insignia.",
        Requisitos: ["Aprendan una cancion en guitarra", "Animen el ambiente con el sonido de su guitarra."]
    },
    {
        Id : 2,
        Nombre: 'Cuidado de mascotas',
        Tag: ["Animales", "Medio ambiente"],
        Familia: "",
        Icon : require('../assets/Insignias/PetCare.png'),
        Descripcion: "Insignia que demuestra que tanto compromiso tienes en el cuidado de las mascotas y animales.",
        Requisitos: ["Demostrar cuidado por algún animal"]
    },
    {
        Id : 3,
        Nombre: 'Armado de carpas',
        Tag: ["Exterior", "Cooperación"],
        Familia: "",
        Icon : require('../assets/Insignias/tent.png'),
        Descripcion: "Los aventureros deben saber armar el lugar donde se quedarán durante la aventura.",
        Requisitos: ["Destacarse en el armado de carpas en campamentos"]
    },
    {
        Id : 4,
        Nombre: 'Pintura',
        Tag: ["Arte", "Pintura","Dibujo"],
        Familia: "",
        Icon : require('../assets/Insignias/painting-palette.png'),
        Descripcion: "Para aquellos que se expresan mediante el color y las formas.",
        Requisitos: ["Dibujar y pintar una obra", "Dejar una pintura de recuerdo para su manada."]
    },
    {
        Id : 5,
        Nombre: 'Teatro',
        Tag: ["Arte", "Actuacion","Teatro"],
        Familia: "",
        Icon : require('../assets/Insignias/theatre.png'),
        Descripcion: "Para quien representa historias frente a una audiencia usando una combinación de discurso, gestos, escenografía, música, sonido y espectáculo.",
        Requisitos: ["Organizar una obra de teatro con seisena."]
    },
    {
        Id : 6,
        Nombre: 'Fogata',
        Tag: ["Campismo", "Fogata","Supervivencia"],
        Familia: "",
        Icon : require('../assets/Insignias/bonfire.png'),
        Descripcion: "Armar y encender una fogata es una de las actividades cotidianas de todo aventurero.",
        Requisitos: ["Enseñarle a sus compañeros a armar una fogata","Realizar una fogata para su unidad"]
    },
    {
        Id : 7,
        Nombre: 'Orientación',
        Tag: ["Campismo", "Brújula","Supervivencia","Orientación"],
        Familia: "",
        Icon : require('../assets/Insignias/compass.png'),
        Descripcion: "Saber utilizar una brújula permitirá que toda tu seisena llegue sana y salva a campamento.",
        Requisitos: ["Saber utilizar la brújula","Ser capaz de seguir un camino con esta"]
    },
    {
        Id : 8,
        Nombre: 'Rastreador',
        Tag: ["Campismo","Supervivencia","Pistas"],
        Familia: "",
        Icon : require('../assets/Insignias/paw-print.png'),
        Descripcion: "Cuando un lobezno es capaz de rastrear y cazar su propia presa, los viejos lobos lo reconocerán como un cazador.",
        Requisitos: ["Conocer las pistas","Ser capaz de identificar un rastro"]
    },
    {
        Id : 9,
        Nombre: 'Astrónomo',
        Tag: ["Astro","Estrella","Observación"],
        Familia: "",
        Icon : require('../assets/Insignias/telescope.png'),
        Descripcion: "En el inmenso firmamento se encuentran los secretos del universo, astrónomos son aquellos que lo observan buscando la verdad.",
        Requisitos: ["Conocer las constelaciones más importantes."]
    },
    {
        Id : 10,
        Nombre: 'Vida sana',
        Tag: ["salud","deporte","buena alimentación"],
        Familia: "",
        Icon : require('../assets/Insignias/apple.png'),
        Descripcion: "Una vida sana basada en una alimentación y en la práctica de deportes, son grandes cualidades de un lobato.",
        Requisitos: ["practicar algún deporte","comer saludable"]
    },
    {
        Id : 11,
        Nombre: 'Arquería',
        Tag: ["Puntería","lanzamiento"],
        Familia: "",
        Icon : require('../assets/Insignias/target.png'),
        Descripcion: "La precisión es una cualidad esencial para todo cazador..",
        Requisitos: ["acertar 3 veces a un blanco a una distancia mínima de 5 metros"]
    },
    {
        Id : 12,
        Nombre: "Maestro pokémon",
        Tag: ["maestro","pokémon","app","juego"],
        Familia: "",
        Icon : require('../assets/Insignias/pokemon.png'),
        Descripcion: "Tengo que ser siempre el mejor, Mejor que nadie más, Atraparlos mi prueba es. Ser un gran maestro pokémon es parte de nuestro lema Siempre Mejor!",
        Requisitos: ["Tener 1 pokemon legendario"]
    },
    {
        Id : 13,
        Nombre: "Cantante",
        Tag: ["Cantar","Música","Arte"],
        Familia: "",
        Icon : require('../assets/Insignias/sing.png'),
        Descripcion: "Un cantante es una persona que produce melodías con su voz. Los lobatos que la poseen son grandes artistas y con gran personalidad.",
        Requisitos: ["Cantar 1 canción durante el Gran Fogón"]
    },
    {
        Id : 14,
        Nombre: "Fotografía",
        Tag: ["Arte","Foto","Paisaje"],
        Familia: "",
        Icon : require('../assets/Insignias/picture.png'),
        Descripcion: "Un fotógrafo es capaz de capturar grandes momentos y guardarlos para la posteridad.",
        Requisitos: ["Tomar 1 foto tipo retrato", "Tomar una foto de un paisaje"]
    },
    {
        Id : 15,
        Nombre: 'Ajedrez',
        Tag: ["Ajedrez", "Juego de mesa","Tablero"],
        Familia: "",
        Icon : require('../assets/Insignias/chess.png'),
        Descripcion: "Solo un genio y gran estratega logra conseguir esta insignia.",
        Requisitos: ["Ganar 5 partidas de ajedrez"]
    },
    {
        Id : 16,
        Nombre: 'Guitarra',
        Tag: ["Musica", "Instrumento"],
        Familia: "",
        Icon : require('../assets/Insignias/acoustic-guitar.png'),
        Descripcion: "Solo los guitarristas mas avezados son dignos de esta insignia.",
        Requisitos: ["Aprendan una cancion en guitarra", "Animen el ambiente con el sonido de su guitarra."]
    },
    {
        Id : 17,
        Nombre: 'Guitarra',
        Tag: ["Musica", "Instrumento"],
        Familia: "",
        Icon : require('../assets/Insignias/acoustic-guitar.png'),
        Descripcion: "Solo los guitarristas mas avezados son dignos de esta insignia.",
        Requisitos: ["Aprendan una cancion en guitarra", "Animen el ambiente con el sonido de su guitarra."]
    },
    {
        Id : 18,
        Nombre: 'Guitarra',
        Tag: ["Musica", "Instrumento"],
        Familia: "",
        Icon : require('../assets/Insignias/acoustic-guitar.png'),
        Descripcion: "Solo los guitarristas mas avezados son dignos de esta insignia.",
        Requisitos: ["Aprendan una cancion en guitarra", "Animen el ambiente con el sonido de su guitarra."]
    },
    {
        Id : 19,
        Nombre: 'Guitarra',
        Tag: ["Musica", "Instrumento"],
        Familia: "",
        Icon : require('../assets/Insignias/acoustic-guitar.png'),
        Descripcion: "Solo los guitarristas mas avezados son dignos de esta insignia.",
        Requisitos: ["Aprendan una cancion en guitarra", "Animen el ambiente con el sonido de su guitarra."]
    },
    {
        Id : 20,
        Nombre: 'Guitarra',
        Tag: ["Musica", "Instrumento"],
        Familia: "",
        Icon : require('../assets/Insignias/acoustic-guitar.png'),
        Descripcion: "Solo los guitarristas mas avezados son dignos de esta insignia.",
        Requisitos: ["Aprendan una cancion en guitarra", "Animen el ambiente con el sonido de su guitarra."]
    },
    {
        Id : 21,
        Nombre: 'Guitarra',
        Tag: ["Musica", "Instrumento"],
        Familia: "",
        Icon : require('../assets/Insignias/acoustic-guitar.png'),
        Descripcion: "Solo los guitarristas mas avezados son dignos de esta insignia.",
        Requisitos: ["Aprendan una cancion en guitarra", "Animen el ambiente con el sonido de su guitarra."]
    },
    {
        Id : 22,
        Nombre: 'Guitarra',
        Tag: ["Musica", "Instrumento"],
        Familia: "",
        Icon : require('../assets/Insignias/acoustic-guitar.png'),
        Descripcion: "Solo los guitarristas mas avezados son dignos de esta insignia.",
        Requisitos: ["Aprendan una cancion en guitarra", "Animen el ambiente con el sonido de su guitarra."]
    },
    {
        Id : 23,
        Nombre: 'Guitarra',
        Tag: ["Musica", "Instrumento"],
        Familia: "",
        Icon : require('../assets/Insignias/acoustic-guitar.png'),
        Descripcion: "Solo los guitarristas mas avezados son dignos de esta insignia.",
        Requisitos: ["Aprendan una cancion en guitarra", "Animen el ambiente con el sonido de su guitarra."]
    },
    {
        Id : 24,
        Nombre: 'Guitarra',
        Tag: ["Musica", "Instrumento"],
        Familia: "",
        Icon : require('../assets/Insignias/acoustic-guitar.png'),
        Descripcion: "Solo los guitarristas mas avezados son dignos de esta insignia.",
        Requisitos: ["Aprendan una cancion en guitarra", "Animen el ambiente con el sonido de su guitarra."]
    },

];export default Insignias;