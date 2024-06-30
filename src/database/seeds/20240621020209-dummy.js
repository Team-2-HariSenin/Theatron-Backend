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
          "$2a$12$.HOb8SlLxGN4usHDihNaQe6IFDodXO09pO6Nfi.M96XzcTJ9F1HDu", // Qwerty123
      },
    ]);
    await queryInterface.bulkInsert("rates", [
      {
        id_user: 1,
        id_movie: 1,
        rate: 0.6,
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
          "https://image.tmdb.org/t/p/w500/4tT9N7IeZtvWYsbGJsbIOGQ36b5.jpg",
        url_image:
          "https://image.tmdb.org/t/p/original/cJ8o1PlMJqB1MayCJ7NeofYX1My.jpg",
        id_director: 1,
      },
      {
        id: 2,
        name: "Sengkolo: Malam Satu Suro",
        overview:
          "The story of a man who felt down and lost faith after experiencing the tragedy of losing his wife and children on the first night of Suro.",
        url_poster:
          "https://image.tmdb.org/t/p/w500/fPmP68Y4Bn3pS1FICpCC7NJMMjj.jpg",
        url_image:
          "https://image.tmdb.org/t/p/original/vriMtND9PhI7lBQI6n0yUsJ6msP.jpg",
        id_director: 2,
      },
      {
        id: 3,
        name: "The Kill Room",
        overview:
          "A hitman, his boss, an art dealer and a money-laundering scheme that accidentally turns the assassin into an overnight avant-garde sensation, one that forces her to play the art world against the underworld.",
        url_poster:
          "https://image.tmdb.org/t/p/w500/qKpdy7N6zX05eisopvvviiTwPxb.jpg",
        url_image:
          "https://image.tmdb.org/t/p/original/bylJq7JEA87YqHMObZUnaP292T2.jpg",
        id_director: 3,
      },
      {
        id: 4,
        name: "MoviePass, MovieCrash",
        overview:
          "Exploring the company founding and the implosion of the business by outside investors who took over the company, left it bankrupt and under investigation.",
        url_poster:
          "https://image.tmdb.org/t/p/w500/eWht9uFRrqmqnLDL5F9grwUiL62.jpg",
        url_image:
          "https://image.tmdb.org/t/p/original/plGXY8pYzdYKCupiFXh5QRtpTyK.jpg",
        id_director: 4,
      },
      {
        id: 5,
        name: "The Blue Angels",
        overview:
          "Follow the veterans and newest class of Navy and Marine Corps flight squadron as they go through intense training and into a season of heart-stopping aerial artistry.",
        url_poster:
          "https://image.tmdb.org/t/p/w500/tdcVDWLfesmPG9NsPEzxpFMXgcB.jpg",
        url_image:
          "https://image.tmdb.org/t/p/original/45mbpJFLxSFLdBT5PEM9HISrLEv.jpg",
        id_director: 5,
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
    ]);
    await queryInterface.bulkInsert("directors", [
      {
        id: 1,
        name: "Teddy Soeriatmadja",
      },
      {
        id: 2,
        name: "Hanny Saputra",
      },
      {
        id: 3,
        name: "Nicol Paone",
      },
      {
        id: 4,
        name: "Muta'Ali",
      },
      {
        id: 5,
        name: "Paul Crowder",
      },
    ]);
    await queryInterface.bulkInsert("movie_writers", [
      {
        id_movie: 1,
        id_writer: 1,
      },
      {
        id_movie: 1,
        id_writer: 2,
      },
      {
        id_movie: 2,
        id_writer: 3,
      },
      {
        id_movie: 3,
        id_writer: 4,
      },
    ]);
    await queryInterface.bulkInsert("writers", [
      {
        id: 1,
        name: "Ika Natassa",
      },
      {
        id: 2,
        name: "Alim Sudio",
      },
      {
        id: 3,
        name: "Rebecca M. Bath",
      },
      {
        id: 4,
        name: "Jonathan Jacobson",
      },
    ]);
    await queryInterface.bulkInsert("movie_stars", [
      {
        id_movie: 1,
        id_star: 1,
      },
      {
        id_movie: 1,
        id_star: 2,
      },
      {
        id_movie: 1,
        id_star: 3,
      },
      {
        id_movie: 2,
        id_star: 4,
      },
      {
        id_movie: 2,
        id_star: 5,
      },
      {
        id_movie: 2,
        id_star: 6,
      },
      {
        id_movie: 3,
        id_star: 7,
      },
      {
        id_movie: 3,
        id_star: 8,
      },
      {
        id_movie: 3,
        id_star: 9,
      },
      {
        id_movie: 4,
        id_star: 10,
      },
      {
        id_movie: 4,
        id_star: 11,
      },
      {
        id_movie: 4,
        id_star: 12,
      },
      {
        id_movie: 5,
        id_star: 13,
      },
      {
        id_movie: 5,
        id_star: 14,
      },
      {
        id_movie: 5,
        id_star: 15,
      },
    ]);
    await queryInterface.bulkInsert("stars", [
      {
        id: 1,
        name: "Nicholas Saputra",
      },
      {
        id: 2,
        name: "Putri Marino",
      },
      {
        id: 3,
        name: "Jerome Kurnia",
      },
      {
        id: 4,
        name: "Donny Alamsyah",
      },
      {
        id: 5,
        name: "Fauzan Nasrul",
      },
      {
        id: 6,
        name: "Anantya Kirana",
      },
      {
        id: 7,
        name: "Alexis Linkletter",
      },
      {
        id: 8,
        name: "Joe Manganiello",
      },
      {
        id: 9,
        name: "Danny Plaza",
      },
      {
        id: 10,
        name: "Mitch Lowe",
      },
      {
        id: 11,
        name: "Nathan McAlone",
      },
      {
        id: 12,
        name: "Sydney Weinshel",
      },
      {
        id: 13,
        name: "Chris Kapuschansky",
      },
      {
        id: 14,
        name: "Brian Kesselring",
      },
      {
        id: 15,
        name: "Monica Borza",
      },
    ]);
    await queryInterface.bulkInsert("movie_categories", [
      {
        id_movie: 1,
        id_category: 1,
      },
      {
        id_movie: 1,
        id_category: 2,
      },
      {
        id_movie: 2,
        id_category: 3,
      },
      {
        id_movie: 3,
        id_category: 4,
      },
      {
        id_movie: 3,
        id_category: 5,
      },
      {
        id_movie: 4,
        id_category: 6,
      },
      {
        id_movie: 4,
        id_category: 4,
      },
      {
        id_movie: 4,
        id_category: 7,
      },
      {
        id_movie: 5,
        id_category: 6,
      },
    ]);
    await queryInterface.bulkInsert("categories", [
      {
        id: 1,
        name: "Drama",
      },
      {
        id: 2,
        name: "Romance",
      },
      {
        id: 3,
        name: "Horror",
      },
      {
        id: 4,
        name: "Commedy",
      },
      {
        id: 5,
        name: "Thriller",
      },
      {
        id: 6,
        name: "Documentary",
      },
      {
        id: 7,
        name: "Crime",
      },
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
