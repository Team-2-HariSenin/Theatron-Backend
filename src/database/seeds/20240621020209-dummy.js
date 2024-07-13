"use strict";

const {
  user,
  admin,
  rate,
  watchlist,
  movie,
  trailer,
  director,
  movie_writer,
  writer,
  movie_star,
  star,
  movie_category,
  category,
} = require("../../models");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {import('sequelize').Sequelize} _Sequelize
   */
  async up(queryInterface, _Sequelize) {
    await user.destroy({ truncate: true });
    await admin.destroy({ truncate: true });
    await rate.destroy({ truncate: true });
    await watchlist.destroy({ truncate: true });
    await movie.destroy({ truncate: true });
    await trailer.destroy({ truncate: true });
    await director.destroy({ truncate: true });
    await movie_writer.destroy({ truncate: true });
    await writer.destroy({ truncate: true });
    await movie_star.destroy({ truncate: true });
    await star.destroy({ truncate: true });
    await movie_category.destroy({ truncate: true });
    await category.destroy({ truncate: true });

    await queryInterface.bulkInsert("users", [
      {
        id: 1,
        name: "John",
        email: "jhon@example.com",
        password:
          "$2a$12$.HOb8SlLxGN4usHDihNaQe6IFDodXO09pO6Nfi.M96XzcTJ9F1HDu", // Qwerty123
      },
      {
        id: 2,
        name: "Doe",
        email: "doe@example.com",
        password:
          "$2a$12$.HOb8SlLxGN4usHDihNaQe6IFDodXO09pO6Nfi.M96XzcTJ9F1HDu", // Qwerty123
      },
      {
        id: 3,
        name: "Faza",
        email: "faza@example.com",
        password:
          "$2a$12$.HOb8SlLxGN4usHDihNaQe6IFDodXO09pO6Nfi.M96XzcTJ9F1HDu", // Qwerty123
      },
      {
        id: 4,
        name: "Dandy",
        email: "dandy@example.com",
        password:
          "$2a$12$.HOb8SlLxGN4usHDihNaQe6IFDodXO09pO6Nfi.M96XzcTJ9F1HDu", // Qwerty123
      },
    ]);
    await queryInterface.bulkInsert("admins", [
      {
        id: 1,
        name: "Admin1",
        email: "admin1@example.com",
        password:
          "$2a$12$.HOb8SlLxGN4usHDihNaQe6IFDodXO09pO6Nfi.M96XzcTJ9F1HDu",
      },
    ]);
    await queryInterface.bulkInsert("rates", [
      {
        id_user: 1,
        id_movie: 1,
        rate: 10,
      },
    ]);
    await queryInterface.bulkInsert("watchlists", [
      {
        id_user: 1,
        id_movie: 1,
      },
    ]);
    await queryInterface.bulkInsert("movies", [
      {
        id: 1,
        name: "The Architecture of Love",
        overview:
          "Raia is a famous writer who suffers from writer's block. In order to get inspired again, he then went to New York. It was in that city that Raia met River and then got involved in a love story that was overshadowed by the past.",
        url_poster:
          "https://res.cloudinary.com/dsceqfqal/image/upload/v1720327552/Poster/poster1720327547410.jpg",
        url_image:
          "https://res.cloudinary.com/dsceqfqal/image/upload/v1720320358/Image/image1720320354516.jpg",
        id_director: 1,
      },
      {
        id: 2,
        name: "Sengkolo: Malam Satu Suro",
        overview:
          "The story of a man who felt down and lost faith after experiencing the tragedy of losing his wife and children on the first night of Suro.",
        url_poster:
          "https://res.cloudinary.com/dsceqfqal/image/upload/v1720320540/Poster/poster1720320537202.jpg",
        url_image:
          "https://res.cloudinary.com/dsceqfqal/image/upload/v1720320539/Image/image1720320537201.jpg",
        id_director: 2,
      },
      {
        id: 3,
        name: "The Kill Room",
        overview:
          "A hitman, his boss, an art dealer and a money-laundering scheme that accidentally turns the assassin into an overnight avant-garde sensation, one that forces her to play the art world against the underworld.",
        url_poster:
          "https://res.cloudinary.com/dsceqfqal/image/upload/v1720320629/Poster/poster1720320621383.jpg",
        url_image:
          "https://res.cloudinary.com/dsceqfqal/image/upload/v1720320627/Image/image1720320621376.jpg",
        id_director: 3,
      },
      {
        id: 4,
        name: "MoviePass, MovieCrash",
        overview:
          "Exploring the company founding and the implosion of the business by outside investors who took over the company, left it bankrupt and under investigation.",
        url_poster:
          "https://res.cloudinary.com/dsceqfqal/image/upload/v1720320765/Poster/poster1720320760606.jpg",
        url_image:
          "https://res.cloudinary.com/dsceqfqal/image/upload/v1720320763/Image/image1720320760603.jpg",
        id_director: 4,
      },
      {
        id: 5,
        name: "The Blue Angels",
        overview:
          "Follow the veterans and newest class of Navy and Marine Corps flight squadron as they go through intense training and into a season of heart-stopping aerial artistry.",
        url_poster:
          "https://res.cloudinary.com/dsceqfqal/image/upload/v1720320836/Poster/poster1720320831561.jpg",
        url_image:
          "https://res.cloudinary.com/dsceqfqal/image/upload/v1720320834/Image/image1720320831558.jpg",
        id_director: 5,
      },
      {
        id: 6,
        name: "Inside Out 2",
        overview:
          "Teenager Riley's mind headquarters is undergoing a sudden demolition to make room for something entirely unexpected: new Emotions! Joy, Sadness, Anger, Fear and Disgust, who\u2019ve long been running a successful operation by all accounts, aren\u2019t sure how to feel when Anxiety shows up. And it looks like she\u2019s not alone.",
        url_poster:
          "https://image.tmdb.org/t/p/original/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg",
        url_image:
          "https://image.tmdb.org/t/p/original/stKGOm8UyhuLPR9sZLjs5AkmncA.jpg",
        id_director: 6,
      },
      {
        id: 7,
        name: "Despicable Me 4",
        overview:
          "Gru and Lucy and their girls \u2014 Margo, Edith and Agnes \u2014 welcome a new member to the Gru family, Gru Jr., who is intent on tormenting his dad. Meanwhile, Gru faces a new nemesis in Maxime Le Mal and his femme fatale girlfriend Valentina, forcing the family to go on the run.",
        url_poster:
          "https://image.tmdb.org/t/p/original/3w84hCFJATpiCO5g8hpdWVPBbmq.jpg",
        url_image:
          "https://image.tmdb.org/t/p/original/zYdVEWpZyG1S1BtMEdOl2W36I7A.jpg",
        id_director: 7,
      },
      {
        id: 8,
        name: "Furiosa: A Mad Max Saga",
        overview:
          "As the world fell, young Furiosa is snatched from the Green Place of Many Mothers and falls into the hands of a great Biker Horde led by the Warlord Dementus. Sweeping through the Wasteland they come across the Citadel presided over by The Immortan Joe. While the two Tyrants war for dominance, Furiosa must survive many trials as she puts together the means to find her way home.",
        url_poster:
          "https://image.tmdb.org/t/p/original/iADOJ8Zymht2JPMoy3R7xceZprc.jpg",
        url_image:
          "https://image.tmdb.org/t/p/original/wNAhuOZ3Zf84jCIlrcI6JhgmY5q.jpg",
        id_director: 8,
      },
      {
        id: 9,
        name: "Beverly Hills Cop: Axel F",
        overview:
          "Forty years after his unforgettable first case in Beverly Hills, Detroit cop Axel Foley returns to do what he does best: solve crimes and cause chaos.",
        url_poster:
          "https://image.tmdb.org/t/p/original/zszRKfzjM5jltiq8rk6rasKVpUv.jpg",
        url_image:
          "https://image.tmdb.org/t/p/original/rrwt0u1rW685u9bJ9ougg5HJEHC.jpg",
        id_director: 9,
      },
      {
        id: 10,
        name: "The Garfield Movie",
        overview:
          "Garfield, the world-famous, Monday-hating, lasagna-loving indoor cat, is about to have a wild outdoor adventure! After an unexpected reunion with his long-lost father \u2013 scruffy street cat Vic \u2013 Garfield and his canine friend Odie are forced from their perfectly pampered life into joining Vic in a hilarious, high-stakes heist.",
        url_poster:
          "https://image.tmdb.org/t/p/original/xYduFGuch9OwbCOEUiamml18ZoB.jpg",
        url_image:
          "https://image.tmdb.org/t/p/original/Akv9GlCCMrzcDkVz4ad8MdLl9DK.jpg",
        id_director: 10,
      },
      {
        id: 11,
        name: "In a Violent Nature",
        overview:
          "The enigmatic resurrection, rampage, and retribution of an undead monster in a remote wilderness unleashes an iconic new killer after a locket is removed from a collapsed fire tower that entombed its rotting corpse.",
        url_poster:
          "https://image.tmdb.org/t/p/original/hPfWHgq07nXbeldwEGxWB4JqwtE.jpg",
        url_image:
          "https://image.tmdb.org/t/p/original/buawWBeKYjYfeiPoS2jIcjOrghZ.jpg",
        id_director: 11,
      },
      {
        id: 12,
        name: "Bad Boys: Ride or Die",
        overview:
          "After their late former Captain is framed, Lowrey and Burnett try to clear his name, only to end up on the run themselves.",
        url_poster:
          "https://image.tmdb.org/t/p/original/nP6RliHjxsz4irTKsxe8FRhKZYl.jpg",
        url_image:
          "https://image.tmdb.org/t/p/original/gRApXuxWmO2forYTuTmcz5RaNUV.jpg",
        id_director: 12,
      },
      {
        id: 13,
        name: "Monkey Man",
        overview:
          "Kid is an anonymous young man who ekes out a meager living in an underground fight club where, night after night, wearing a gorilla mask, he is beaten bloody by more popular fighters for cash. After years of suppressed rage, Kid discovers a way to infiltrate the enclave of the city\u2019s sinister elite. As his childhood trauma boils over, his mysteriously scarred hands unleash an explosive campaign of retribution to settle the score with the men who took everything from him.",
        url_poster:
          "https://image.tmdb.org/t/p/original/4lhR4L2vzzjl68P1zJyCH755Oz4.jpg",
        url_image:
          "https://image.tmdb.org/t/p/original/lA6KdSkCTxwzvqzPqxch997RabQ.jpg",
        id_director: 13,
      },
      {
        id: 14,
        name: "A Quiet Place:\u00a0Day One",
        overview:
          "As New York City is invaded by alien creatures who hunt by sound, a woman named Sam fights to survive.",
        url_poster:
          "https://image.tmdb.org/t/p/original/yrpPYKijwdMHyTGIOd1iK1h0Xno.jpg",
        url_image:
          "https://image.tmdb.org/t/p/original/6XjMwQTvnICBz6TguiDKkDVHvgS.jpg",
        id_director: 14,
      },
      {
        id: 15,
        name: "Civil War",
        overview:
          "In the near future, a group of war journalists attempt to survive while reporting the truth as the United States stands on the brink of civil war.",
        url_poster:
          "https://image.tmdb.org/t/p/original/sh7Rg8Er3tFcN9BpKIPOMvALgZd.jpg",
        url_image:
          "https://image.tmdb.org/t/p/original/a4IWRYNMNMszIkRbEIiNsRg6cvt.jpg",
        id_director: 15,
      },
      {
        id: 16,
        name: "Trigger Warning",
        overview:
          "A Special Forces commando uncovers a dangerous conspiracy when she returns to her hometown looking for answers into her beloved father's death.",
        url_poster:
          "https://image.tmdb.org/t/p/original/lJN24nn28s5afC1UnLPYRgYOp1K.jpg",
        url_image:
          "https://image.tmdb.org/t/p/original/aATi2PtaOQCVAquCym6OU0Z4FjY.jpg",
        id_director: 16,
      },
      {
        id: 17,
        name: "Boneyard",
        overview:
          'After Police Chief Carter discovers the remains of eleven women, FBI Special Agent Petrovick is recruited to profile the serial killer responsible for the infamous \\"boneyard\\" killings. As the police force, narcotics agency, and FBI lock horns, a tangled web of intrigue turns everyone into a suspect.',
        url_poster:
          "https://image.tmdb.org/t/p/original/xkNK36hQv8SWiwiQoE7naRfP0zL.jpg",
        url_image:
          "https://image.tmdb.org/t/p/original/uNTciMXpCQDg7gvgMsPCdnxo6Re.jpg",
        id_director: 17,
      },
      {
        id: 18,
        name: "The Watchers",
        overview:
          "A young artist gets stranded in an extensive, immaculate forest in western Ireland, where, after finding shelter, she becomes trapped alongside three strangers, stalked by mysterious creatures each night.",
        url_poster:
          "https://image.tmdb.org/t/p/original/vZVEUPychdvZLrTNwWErr9xZFmu.jpg",
        url_image:
          "https://image.tmdb.org/t/p/original/wXx72bbhhnfORmlSNMWR28fPd8b.jpg",
        id_director: 18,
      },
      {
        id: 19,
        name: "IF",
        overview:
          "A young girl who goes through a difficult experience begins to see everyone's imaginary friends who have been left behind as their real-life friends have grown up.",
        url_poster:
          "https://image.tmdb.org/t/p/original/xbKFv4KF3sVYuWKllLlwWDmuZP7.jpg",
        url_image:
          "https://image.tmdb.org/t/p/original/nxxCPRGTzxUH8SFMrIsvMmdxHti.jpg",
        id_director: 19,
      },
      {
        id: 20,
        name: "A Family Affair",
        overview:
          "The only thing worse than being the assistant to a high-maintenance movie star who doesn't take you seriously? Finding out he's smitten with your mom.",
        url_poster:
          "https://image.tmdb.org/t/p/original/l0CaVyqnTsWwNd4hWsrLNEk1Wjd.jpg",
        url_image:
          "https://image.tmdb.org/t/p/original/ngLxW9WqQAkTCBTcjOSt2Pnz5qZ.jpg",
        id_director: 20,
      },
    ]);
    await queryInterface.bulkInsert("trailers", [
      {
        id: 1,
        id_movie: 1,
        title:
          "The Architecture of Love Final Trailer | Apa Sih Maunya Nicholas Saputra?",
        duration: "1.03",
        key: "d5PViAkoENI",
      },
      {
        id: 2,
        id_movie: 2,
        title:
          "Sengkolo Malam Satu Suro - Official Trailer | 20 Juni 2024 di Bioskop",
        duration: "2.00",
        key: "mB8DCB42w8E",
      },
      {
        id: 3,
        id_movie: 3,
        title: "The Kill Room | Teaser | 2023",
        duration: "0.30",
        key: "EbzBCsuzF3U",
      },
      {
        id: 4,
        id_movie: 4,
        title: "MoviePass, MovieCrash | Official Trailer | HBO",
        duration: "1.54",
        key: "3G75RASEmUI",
      },
      {
        id: 5,
        id_movie: 5,
        title: "The Real Hero",
        duration: "2.38",
        key: "0seVcwQ32yU",
      },
      {
        id: 6,
        id_movie: 6,
        title:
          "Inside Out 2 | Official IMAX\u00ae Interview | Experience It in IMAX\u00ae",
        duration: "6.27",
        key: "RUFqAHPLkzI",
      },
      {
        id: 7,
        id_movie: 6,
        title: "Inside Out 2 | Time to Celebrate",
        duration: "0.31",
        key: "RY5aH21ohU4",
      },
      {
        id: 8,
        id_movie: 6,
        title: "Inside Out 2 | Best Movie of the Year",
        duration: "0.16",
        key: "eioXDOSx6rQ",
      },
      {
        id: 9,
        id_movie: 6,
        title: "Inside Out 2 | IMAX\u00ae Upgrade",
        duration: "2.27",
        key: "j7jvAHcKJGs",
      },
      {
        id: 10,
        id_movie: 6,
        title: "Inside Out 2 | #1 Movie is Certified Fresh",
        duration: "0.16",
        key: "b0mVq8LGOkI",
      },
      {
        id: 11,
        id_movie: 7,
        title: "Despicable Me 4 | Fluffy Cereal Spot",
        duration: "0.45",
        key: "jmmLk3wSwaI",
      },
      {
        id: 12,
        id_movie: 7,
        title: "DESPICABLE ME 4 - Steve Carell Wimbledon Interview",
        duration: "3.44",
        key: "2eKniSb06-E",
      },
      {
        id: 13,
        id_movie: 7,
        title: "Despicable Me 4 Is...",
        duration: "1.01",
        key: "T1bzhh5XEvs",
      },
      {
        id: 14,
        id_movie: 8,
        title:
          "FURIOSA : A MAD MAX SAGA | Sneak Peek  \u201cChapters\u201d Trailer",
        duration: "5.44",
        key: "LYV3001u574",
      },
      {
        id: 15,
        id_movie: 8,
        title: "FURIOSA : A MAD MAX SAGA | Tickets on Sale Trailer",
        duration: "1.33",
        key: "XotnyLjS8fo",
      },
      {
        id: 16,
        id_movie: 8,
        title: "FURIOSA : A MAD MAX SAGA | OFFICIAL TRAILER #2",
        duration: "2.27",
        key: "FVswuip0-co",
      },
      {
        id: 17,
        id_movie: 9,
        title: "Beverly Hills Cop: Axel F | Official Trailer | Netflix",
        duration: "2.36",
        key: "KoxhkE_U3Ww",
      },
      {
        id: 18,
        id_movie: 9,
        title: "\u201880s Edit: Beverly Hills Cop: Axel F Trailer | Netflix",
        duration: "1.53",
        key: "4T4YPfCbPto",
      },
      {
        id: 19,
        id_movie: 9,
        title: "Beverly Hills Cop: Axel F | Official Teaser Trailer | Netflix",
        duration: "1.34",
        key: "qBG3iyr5N70",
      },
      {
        id: 20,
        id_movie: 10,
        title: "The Garfield Movie - Official Trailer - Only In Cinemas Now",
        duration: "1.00",
        key: "j0Qk01BhAQM",
      },
      {
        id: 21,
        id_movie: 10,
        title: "THE GARFIELD MOVIE - New Trailer (HD)",
        duration: "2.37",
        key: "S3XjsSvwSuU",
      },
      {
        id: 22,
        id_movie: 10,
        title: "THE GARFIELD MOVIE - Final Trailer",
        duration: "2.37",
        key: "yk2Ej59DnrE",
      },
      {
        id: 23,
        id_movie: 11,
        title: "In A Violent Nature Official Trailer | Shudder",
        duration: "1.41",
        key: "4BVW7axwtQk",
      },
      {
        id: 24,
        id_movie: 11,
        title: "In a Violent Nature - Official Trailer | HD | IFC Films",
        duration: "1.40",
        key: "WyXuRmXbS7U",
      },
      {
        id: 25,
        id_movie: 11,
        title:
          "IN A VIOLENT NATURE | OFFICIAL TRAILER | IN CINEMAS NOW | Altitude Films",
        duration: "1.13",
        key: "5D8La4KMVzc",
      },
      {
        id: 26,
        id_movie: 11,
        title: 'In a Violent Nature - "Buckle Up" Trailer | HD | IFC Films',
        duration: "1.39",
        key: "PqxIeXgiXCM",
      },
      {
        id: 27,
        id_movie: 12,
        title:
          "BAD BOYS: RIDE OR DIE | Official Trailer | Experience It In IMAX\u00ae",
        duration: "2.33",
        key: "g1sdO-u79Ks",
      },
      {
        id: 28,
        id_movie: 12,
        title: "Bad Boys: Ride Or Die - Final Trailer  - Only In Cinemas Now",
        duration: "2.11",
        key: "uWLNl_KQCAU",
      },
      {
        id: 29,
        id_movie: 12,
        title: "BAD BOYS: RIDE OR DIE \u2013 Final Trailer (HD)",
        duration: "2.20",
        key: "ZTQyMmz-cQE",
      },
      {
        id: 30,
        id_movie: 13,
        title: "Monkey Man | Official Trailer 2",
        duration: "2.53",
        key: "aqa3YTtwvaU",
      },
      {
        id: 31,
        id_movie: 13,
        title: "MONKEY MAN | Official Trailer (Universal Pictures) - HD",
        duration: "3.21",
        key: "sLSlmb3B9J4",
      },
      {
        id: 32,
        id_movie: 13,
        title: "Monkey Man | Official Trailer",
        duration: "3.17",
        key: "g8zxiB5Qhsc",
      },
      {
        id: 33,
        id_movie: 14,
        title:
          "A Quiet Place: Day One | Final Trailer (2024 Movie) - Lupita Nyong'o, Joseph Quinn",
        duration: "1.01",
        key: "E-WIb4ATfT8",
      },
      {
        id: 34,
        id_movie: 14,
        title:
          "A Quiet Place: Day One | Official Trailer 2 (2024 Movie) - Lupita Nyong'o, Joseph Quinn",
        duration: "2.27",
        key: "gjx-iHGXk9Q",
      },
      {
        id: 35,
        id_movie: 14,
        title:
          "A Quiet Place: Day One | Official Trailer (2024 Movie) - Lupita Nyong'o, Joseph Quinn",
        duration: "1.39",
        key: "YPY7J-flzE8",
      },
      {
        id: 36,
        id_movie: 15,
        title: "Civil War | Official Trailer 2 HD | A24",
        duration: "1.24",
        key: "cA4wVhs3HC0",
      },
      {
        id: 37,
        id_movie: 15,
        title: "Civil War | Official Final Trailer HD | A24",
        duration: "1.01",
        key: "c2G18nIVpNE",
      },
      {
        id: 38,
        id_movie: 15,
        title: "Civil War | Official Trailer HD | A24",
        duration: "2.24",
        key: "aDyQxtg0V2w",
      },
      {
        id: 39,
        id_movie: 16,
        title:
          "Hardware Store Fight Scene (feat. Jessica Alba) | Trigger Warning | Netflix",
        duration: "2.18",
        key: "SUDdwZECqfo",
      },
      {
        id: 40,
        id_movie: 16,
        title: "Trigger Warning | Official Trailer | Netflix",
        duration: "1.54",
        key: "MnHTLh6ruW0",
      },
      {
        id: 41,
        id_movie: 17,
        title:
          'Boneyard (2024) Official Trailer - Brian Van Holt, Curtis "50 Cent" Jackson, Mel Gibson',
        duration: "2.05",
        key: "GS5OoPsRkKs",
      },
      {
        id: 42,
        id_movie: 18,
        title: "The Watchers | Official Teaser Trailer",
        duration: "2.04",
        key: "CrhrNS0JFyg",
      },
      {
        id: 43,
        id_movie: 18,
        title: "THE WATCHERS | Official Trailer",
        duration: "2.55",
        key: "dYo91Fq9tKY",
      },
      {
        id: 44,
        id_movie: 19,
        title:
          "IF | Final\u00a0Trailer\u00a0(2024 Movie) - Ryan Reynolds, John Krasinski, Steve Carell",
        duration: "2.19",
        key: "mb2187ZQtBE",
      },
      {
        id: 45,
        id_movie: 19,
        title:
          "IF | International Trailer (2024 Movie) - Ryan Reynolds, John Krasinski, Steve Carell",
        duration: "1.32",
        key: "TP47e3-nmw8",
      },
      {
        id: 46,
        id_movie: 19,
        title: "IF | Official Teaser Trailer",
        duration: "2.23",
        key: "el0N_MDcp0Y",
      },
      {
        id: 47,
        id_movie: 20,
        title: "A Family Affair | Official Trailer | Netflix",
        duration: "2.14",
        key: "Ytc2eifpiuQ",
      },
    ]);
    await queryInterface.bulkInsert("directors", [
      { id: 1, name: "Teddy Soeriatmadja" },
      { id: 2, name: "Hanny Saputra" },
      { id: 3, name: "Nicol Paone" },
      { id: 4, name: "Muta'Ali" },
      { id: 5, name: "Paul Crowder" },
      { id: 6, name: "Kelsey Mann" },
      { id: 7, name: "Chris Renaud" },
      { id: 8, name: "George Miller" },
      { id: 9, name: "Mark Molloy" },
      { id: 10, name: "Mark Dindal" },
      { id: 11, name: "Crish Nash" },
      { id: 12, name: "Adil El Arbi" },
      { id: 13, name: "Dev Patel" },
      { id: 14, name: "Michael Sarnoski" },
      { id: 15, name: "Alex Garland" },
      { id: 16, name: "Mouly Surya" },
      { id: 17, name: "Asif Akbar" },
      { id: 18, name: "Ishana Shyamalan" },
      { id: 19, name: "John Krasinski" },
      { id: 20, name: "Richard LaGravenese" },
    ]);
    await queryInterface.bulkInsert("movie_writers", [
      { id: 1, id_movie: 1, id_writer: 1 },
      { id: 2, id_movie: 1, id_writer: 2 },
      { id: 3, id_movie: 2, id_writer: 3 },
      { id: 4, id_movie: 3, id_writer: 4 },
      { id: 5, id_movie: 6, id_writer: 5 },
      { id: 6, id_movie: 6, id_writer: 6 },
      { id: 7, id_movie: 6, id_writer: 7 },
      { id: 8, id_movie: 7, id_writer: 8 },
      { id: 9, id_movie: 7, id_writer: 9 },
      { id: 10, id_movie: 8, id_writer: 10 },
      { id: 11, id_movie: 8, id_writer: 12 },
      { id: 12, id_movie: 9, id_writer: 13 },
      { id: 13, id_movie: 9, id_writer: 14 },
      { id: 14, id_movie: 9, id_writer: 15 },
      { id: 15, id_movie: 10, id_writer: 16 },
      { id: 16, id_movie: 10, id_writer: 19 },
      { id: 17, id_movie: 10, id_writer: 20 },
      { id: 18, id_movie: 11, id_writer: 21 },
      { id: 19, id_movie: 12, id_writer: 22 },
      { id: 20, id_movie: 12, id_writer: 13 },
      { id: 21, id_movie: 12, id_writer: 24 },
      { id: 22, id_movie: 13, id_writer: 25 },
      { id: 23, id_movie: 13, id_writer: 26 },
      { id: 24, id_movie: 13, id_writer: 27 },
      { id: 25, id_movie: 14, id_writer: 28 },
      { id: 26, id_movie: 14, id_writer: 29 },
      { id: 27, id_movie: 14, id_writer: 30 },
      { id: 28, id_movie: 15, id_writer: 31 },
      { id: 29, id_movie: 16, id_writer: 32 },
      { id: 30, id_movie: 16, id_writer: 33 },
      { id: 31, id_movie: 16, id_writer: 34 },
      { id: 32, id_movie: 17, id_writer: 35 },
      { id: 33, id_movie: 17, id_writer: 36 },
      { id: 34, id_movie: 17, id_writer: 37 },
      { id: 35, id_movie: 18, id_writer: 38 },
      { id: 36, id_movie: 18, id_writer: 39 },
      { id: 37, id_movie: 19, id_writer: 29 },
      { id: 38, id_movie: 20, id_writer: 40 },
    ]);
    await queryInterface.bulkInsert("writers", [
      { id: 1, name: "Ika Natassa" },
      { id: 2, name: "Alim Sudio" },
      { id: 3, name: "Rebecca M. Bath" },
      { id: 4, name: "Jonathan Jacobson" },
      { id: 5, name: "Meg LeFauve" },
      { id: 6, name: "Dave Holstein" },
      { id: 7, name: "Kelsey Mann" },
      { id: 8, name: "Mike White" },
      { id: 9, name: "Ken Daurio" },
      { id: 10, name: "George Miller" },
      { id: 11, name: " Nick Lathouris" },
      { id: 12, name: "Nick Lathouris" },
      { id: 13, name: "Will Beall" },
      { id: 14, name: "Tom Gormican" },
      { id: 15, name: "Kevin Etten" },
      { id: 16, name: "Paul A. Kaplan" },
      { id: 17, name: "Samuel L. Jackson" },
      { id: 18, name: "Hannah Waddingham" },
      { id: 19, name: "Mark Torgove" },
      { id: 20, name: "David Reynolds" },
      { id: 21, name: "Crish Nash" },
      { id: 22, name: "Chris Bremner" },
      { id: 24, name: "George Gallo" },
      { id: 25, name: "Dev Patel" },
      { id: 26, name: "Paul Angunawela" },
      { id: 27, name: "Jhon Collee" },
      { id: 28, name: "Michael Sarnoski" },
      { id: 29, name: "John Krasinski" },
      { id: 30, name: "Bryan Woods" },
      { id: 31, name: "Alex Garland" },
      { id: 32, name: "Jhon Brancato" },
      { id: 33, name: "Josh Olson" },
      { id: 34, name: "Halley Wegryn Gross" },
      { id: 35, name: "Asif Abar" },
      { id: 36, name: "Hank Byrd" },
      { id: 37, name: "Vincent E. McDaniel" },
      { id: 38, name: "Ishyana Shyamalan" },
      { id: 39, name: "A.M. Shine" },
      { id: 40, name: "Carrie Solomon" },
    ]);
    await queryInterface.bulkInsert("movie_stars", [
      { id: 1, id_movie: 1, id_star: 1 },
      { id: 2, id_movie: 1, id_star: 2 },
      { id: 3, id_movie: 1, id_star: 3 },
      { id: 4, id_movie: 2, id_star: 4 },
      { id: 5, id_movie: 2, id_star: 5 },
      { id: 6, id_movie: 2, id_star: 6 },
      { id: 7, id_movie: 3, id_star: 7 },
      { id: 8, id_movie: 3, id_star: 8 },
      { id: 9, id_movie: 3, id_star: 9 },
      { id: 10, id_movie: 4, id_star: 10 },
      { id: 11, id_movie: 4, id_star: 11 },
      { id: 12, id_movie: 4, id_star: 12 },
      { id: 13, id_movie: 5, id_star: 13 },
      { id: 14, id_movie: 5, id_star: 14 },
      { id: 15, id_movie: 5, id_star: 15 },
      { id: 16, id_movie: 6, id_star: 16 },
      { id: 17, id_movie: 6, id_star: 17 },
      { id: 18, id_movie: 6, id_star: 18 },
      { id: 19, id_movie: 7, id_star: 19 },
      { id: 20, id_movie: 7, id_star: 20 },
      { id: 21, id_movie: 7, id_star: 21 },
      { id: 22, id_movie: 8, id_star: 22 },
      { id: 23, id_movie: 8, id_star: 23 },
      { id: 24, id_movie: 8, id_star: 24 },
      { id: 25, id_movie: 9, id_star: 25 },
      { id: 26, id_movie: 9, id_star: 26 },
      { id: 27, id_movie: 9, id_star: 27 },
      { id: 28, id_movie: 10, id_star: 28 },
      { id: 29, id_movie: 10, id_star: 29 },
      { id: 30, id_movie: 10, id_star: 30 },
      { id: 31, id_movie: 11, id_star: 31 },
      { id: 32, id_movie: 11, id_star: 32 },
      { id: 33, id_movie: 11, id_star: 33 },
      { id: 34, id_movie: 12, id_star: 34 },
      { id: 35, id_movie: 12, id_star: 35 },
      { id: 36, id_movie: 12, id_star: 36 },
      { id: 37, id_movie: 13, id_star: 37 },
      { id: 38, id_movie: 14, id_star: 40 },
      { id: 39, id_movie: 14, id_star: 41 },
      { id: 40, id_movie: 14, id_star: 42 },
      { id: 41, id_movie: 15, id_star: 43 },
      { id: 42, id_movie: 15, id_star: 44 },
      { id: 43, id_movie: 15, id_star: 45 },
      { id: 44, id_movie: 16, id_star: 46 },
      { id: 45, id_movie: 16, id_star: 47 },
      { id: 46, id_movie: 16, id_star: 48 },
      { id: 47, id_movie: 17, id_star: 49 },
      { id: 48, id_movie: 17, id_star: 50 },
      { id: 49, id_movie: 17, id_star: 51 },
      { id: 50, id_movie: 18, id_star: 52 },
      { id: 51, id_movie: 18, id_star: 53 },
      { id: 52, id_movie: 18, id_star: 54 },
      { id: 53, id_movie: 19, id_star: 55 },
      { id: 54, id_movie: 19, id_star: 57 },
      { id: 55, id_movie: 19, id_star: 56 },
      { id: 56, id_movie: 20, id_star: 58 },
      { id: 57, id_movie: 20, id_star: 59 },
      { id: 58, id_movie: 20, id_star: 60 },
    ]);
    await queryInterface.bulkInsert("stars", [
      { id: 1, name: "Nicholas Saputra" },
      { id: 2, name: "Putri Marino" },
      { id: 3, name: "Jerome Kurnia" },
      { id: 4, name: "Donny Alamsyah" },
      { id: 5, name: "Fauzan Nasrul" },
      { id: 6, name: "Anantya Kirana" },
      { id: 7, name: "Alexis Linkletter" },
      { id: 8, name: "Joe Manganiello" },
      { id: 9, name: "Danny Plaza" },
      { id: 10, name: "Mitch Lowe" },
      { id: 11, name: "Nathan McAlone" },
      { id: 12, name: "Sydney Weinshel" },
      { id: 13, name: "Chris Kapuschansky" },
      { id: 14, name: "Brian Kesselring" },
      { id: 15, name: "Monica Borza" },
      { id: 16, name: "Amy Poehler" },
      { id: 17, name: "Maya Hawke" },
      { id: 18, name: "Kensington Taliman" },
      { id: 19, name: "Steve Carell" },
      { id: 20, name: "Kristen Wiig" },
      { id: 21, name: "Pierre Coffin" },
      { id: 22, name: "Anya Taylor-Joy" },
      { id: 23, name: "Chis Hemsworth" },
      { id: 24, name: "Tom Burke" },
      { id: 25, name: "Eddie Murphy" },
      { id: 26, name: "Joseph Gordon-Levit" },
      { id: 27, name: "Taylour Paige" },
      { id: 28, name: "Chris Pratt" },
      { id: 29, name: "Samuel L. Jackson" },
      { id: 30, name: "Hannah Waddingham" },
      { id: 31, name: "Ry Barrett" },
      { id: 32, name: "Andrea Pavlovic" },
      { id: 33, name: "Cameron Love" },
      { id: 34, name: "Will Smith" },
      { id: 35, name: "Martin Lawrence" },
      { id: 36, name: "Vanessa Hudgens" },
      { id: 37, name: "Dev Patel" },
      { id: 38, name: "Sharlto Copley" },
      { id: 39, name: "Pitobash" },
      { id: 40, name: "Lupita Nyong'o" },
      { id: 41, name: "Joseph Quinn" },
      { id: 42, name: "Alex Wolff" },
      { id: 43, name: "Kristen Dunst" },
      { id: 44, name: "Wagner Moura" },
      { id: 45, name: "Cailee Spaeny" },
      { id: 46, name: "Jessica Alba" },
      { id: 47, name: "Mark Webber" },
      { id: 48, name: "Anthony Michael Hall" },
      { id: 49, name: "Mel Gibson" },
      { id: 50, name: "50 Cent" },
      { id: 51, name: "Brian Van Holt" },
      { id: 52, name: "Dakota Fanning" },
      { id: 53, name: "Georgina Campbell" },
      { id: 54, name: "Olwen Fouere" },
      { id: 55, name: "Cailey Fleming" },
      { id: 56, name: "John Krasinski" },
      { id: 57, name: "Ryan Reynolds" },
      { id: 58, name: "Nicole Kidman" },
      { id: 59, name: "Zac Efron" },
      { id: 60, name: "Joey King" },
    ]);
    await queryInterface.bulkInsert("categories", [
      { id: 1, name: "Drama" },
      { id: 2, name: "Romance" },
      { id: 3, name: "Horror" },
      { id: 4, name: "Commedy" },
      { id: 5, name: "Thriller" },
      { id: 6, name: "Documentary" },
      { id: 7, name: "Crime" },
      { id: 8, name: "Animation" },
      { id: 9, name: "Adventure" },
      { id: 13, name: "Action" },
      { id: 14, name: "Sci-Fi" },
      { id: 16, name: "Fantasy" },
      { id: 17, name: "Mystery" },
    ]);
    await queryInterface.bulkInsert("movie_categories", [
      { id: 1, id_movie: 1, id_category: 1 },
      { id: 2, id_movie: 1, id_category: 2 },
      { id: 3, id_movie: 2, id_category: 3 },
      { id: 4, id_movie: 3, id_category: 4 },
      { id: 5, id_movie: 3, id_category: 5 },
      { id: 6, id_movie: 4, id_category: 6 },
      { id: 7, id_movie: 4, id_category: 4 },
      { id: 8, id_movie: 4, id_category: 7 },
      { id: 9, id_movie: 5, id_category: 6 },
      { id: 10, id_movie: 6, id_category: 8 },
      { id: 11, id_movie: 6, id_category: 9 },
      { id: 12, id_movie: 6, id_category: 4 },
      { id: 13, id_movie: 7, id_category: 8 },
      { id: 14, id_movie: 7, id_category: 9 },
      { id: 15, id_movie: 7, id_category: 4 },
      { id: 16, id_movie: 8, id_category: 13 },
      { id: 17, id_movie: 8, id_category: 9 },
      { id: 18, id_movie: 8, id_category: 14 },
      { id: 19, id_movie: 9, id_category: 13 },
      { id: 20, id_movie: 9, id_category: 4 },
      { id: 21, id_movie: 9, id_category: 7 },
      { id: 22, id_movie: 10, id_category: 8 },
      { id: 23, id_movie: 10, id_category: 9 },
      { id: 24, id_movie: 10, id_category: 4 },
      { id: 25, id_movie: 11, id_category: 1 },
      { id: 26, id_movie: 11, id_category: 3 },
      { id: 27, id_movie: 11, id_category: 5 },
      { id: 28, id_movie: 12, id_category: 13 },
      { id: 29, id_movie: 12, id_category: 9 },
      { id: 30, id_movie: 12, id_category: 4 },
      { id: 31, id_movie: 13, id_category: 13 },
      { id: 32, id_movie: 13, id_category: 7 },
      { id: 33, id_movie: 13, id_category: 5 },
      { id: 34, id_movie: 14, id_category: 1 },
      { id: 35, id_movie: 14, id_category: 3 },
      { id: 36, id_movie: 14, id_category: 14 },
      { id: 37, id_movie: 15, id_category: 13 },
      { id: 38, id_movie: 15, id_category: 9 },
      { id: 39, id_movie: 15, id_category: 5 },
      { id: 40, id_movie: 16, id_category: 13 },
      { id: 41, id_movie: 16, id_category: 7 },
      { id: 42, id_movie: 16, id_category: 5 },
      { id: 43, id_movie: 17, id_category: 13 },
      { id: 44, id_movie: 17, id_category: 7 },
      { id: 45, id_movie: 17, id_category: 1 },
      { id: 46, id_movie: 18, id_category: 16 },
      { id: 47, id_movie: 18, id_category: 3 },
      { id: 48, id_movie: 18, id_category: 17 },
      { id: 49, id_movie: 19, id_category: 8 },
      { id: 50, id_movie: 19, id_category: 4 },
      { id: 51, id_movie: 19, id_category: 1 },
      { id: 52, id_movie: 20, id_category: 4 },
      { id: 53, id_movie: 20, id_category: 1 },
      { id: 54, id_movie: 20, id_category: 2 },
    ]);
  },
  /**
   * @param {import('sequelize').QueryInterface} _queryInterface
   * @param {import('sequelize').Sequelize} _Sequelize
   */
  async down(_queryInterface, _Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
