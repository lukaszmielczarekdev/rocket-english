/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../contexts/userContext";
import GeneralContext from "../contexts/generalContext";
import Footer from "./footer";
import shop_webp from "../images/shop.webp";
import shop_png from "../images/shop.png";
import rocket_webp from "../images/rocket.webp";
import rocket_png from "../images/rocket.png";
import casino_webp from "../images/casino.webp";
import casino_png from "../images/casino.png";
import bar_webp from "../images/bar.webp";
import bar_png from "../images/bar.png";
import ufo_webp from "../images/ufo-logo.webp";
import ufo_png from "../images/ufo-logo.png";
import mine_webp from "../images/mine.webp";
import mine_png from "../images/mine.png";
import university_webp from "../images/university.webp";
import university_png from "../images/university.png";
import quiz_webp from "../images/quiz.webp";
import quiz_png from "../images/quiz.png";
import satelite_webp from "../images/satelite.webp";
import satelite_png from "../images/satelite.png";
import "./help.css";
import "./nav.css";

const Help = (props) => {
  const user = useContext(UserContext);
  const general = useContext(GeneralContext);

  useEffect(() => {
    general.setGamePaused(false);
    user.onSetPlanet(user.user.currentPlanet);
  }, []);

  const handleGoBack = () => {
    return user.user.currentPlanet === "menu"
      ? "/"
      : `/${user.user.currentPlanet}`;
  };

  return (
    <div className="help-wrapper flex-auto">
      <main id="help" className="main-background">
        <div className="place-header-container-help">
          <section className="place-split-help header-container-help">
            <header>
              <article className="content-help">
                <h2>How to play</h2>
                <hr className="underline-help" />
                <p className="place-description-help">
                  By discovering the planets of the fictional galaxy, you will
                  get to know many interesting and strange places that will
                  allow you to increase your progress in exploring this
                  extraordinary world. In the guest mode, you can easily learn
                  the story and explore even the farthest corners of the galaxy
                  without meeting any additional criteria, and you can also
                  enjoy all the attractions that await on the planets and
                  beyond. The player mode is more of a challenge, as moving
                  around requires a certain level of character and a rocket. The
                  levels increase with the amount of experience gained that you
                  get by taking up challenges. The game has an autosave
                  function, so you can leave it at any time and be able to
                  continue where you left off. Below is a detailed description
                  of all locations, which you can return to at any time in the
                  game.
                </p>
              </article>
            </header>
            <section></section>
          </section>
        </div>
        <section className="place-split-help">
          <picture className="image fit padding-1rem">
            <source srcSet={shop_webp} type="image/webp" />
            <source srcSet={shop_png} type="image/png" />
            <img
              src={shop_png}
              type="image/png"
              width="100em"
              height="auto"
              alt={
                "A big black neon sign with red lettering that says open. A shop logo."
              }
            />
          </picture>
          <article className="content-help">
            <header className="places-header-help">
              <hr className="underline-places-help-right" />
              <h3>trade</h3>
            </header>
            <p className="place-description-help">
              What would life be without trading? One of the first store owners
              on the planet Crion once asked. You can buy some useful items from
              the trader, which you will need to upgrade the rocket or when you
              need help with solving the quiz. Due to the increase in
              competition in recent years, prices in stores are no longer as
              high as they used to be and goods are more accessible.
            </p>
          </article>
        </section>
        <section className="place-split-help">
          <picture className="image fit padding-1rem mobile">
            <source srcSet={casino_webp} type="image/webp" />
            <source srcSet={casino_png} type="image/png" />
            <img
              src={casino_png}
              type="image/png"
              width="100em"
              height="auto"
              alt={
                "The big pink neon sign with the word casino. A casino logo."
              }
            />
          </picture>
          <article className="content-help">
            <header className="places-header-help">
              <h3>Gambling</h3>
              <hr className="underline-places-help-left" />
            </header>
            <p className="place-description-help">
              Gambling is dangerous, but it can be profitable when taken in
              reasonable amounts. There are casinos on some of the planets that
              offer you the chance to get rich quickly or lose your money. Rumor
              has it that somewhere in the galaxy there is an illegal
              underground casino where the game is for more than just credits
              ...
            </p>
          </article>
          <picture className="image fit padding-1rem desktop">
            <source srcSet={casino_webp} type="image/webp" />
            <source srcSet={casino_png} type="image/png" />
            <img
              src={casino_png}
              type="image/png"
              width="100em"
              height="auto"
              alt={
                "The big pink neon sign with the word casino. A casino logo."
              }
            />
          </picture>
        </section>
        <section className="place-split-help">
          <picture className="image fit padding-1rem">
            <source srcSet={bar_webp} type="image/webp" />
            <source srcSet={bar_png} type="image/png" />
            <img
              src={bar_png}
              type="image/png"
              width="100em"
              height="auto"
              alt={"A Shiny black and pink drink neon sign. A bar logo."}
            />
          </picture>
          <article className="content-help">
            <header className="places-header-help">
              <hr className="underline-places-help-right" />
              <h3>Bar</h3>
            </header>
            <p className="place-description-help">
              Bars are very popular places in the galaxy. These are places for
              socializing, exchanging ideas and resolving various types of
              disputes. There is usually one person in such a place who has an
              extraordinary amount of information on various topics... a
              bartender. You can ask him about the latest rumors and all kinds
              of other things.
            </p>
          </article>
        </section>
        <section className="place-split-help">
          <picture className="image fit padding-1rem mobile">
            <source srcSet={rocket_webp} type="image/webp" />
            <source srcSet={rocket_png} type="image/png" />
            <img
              src={rocket_png}
              type="image/png"
              width="100em"
              height="auto"
              alt={
                "A large robot and a space rocket, as well as a night and stars in the background. A factory logo."
              }
            />
          </picture>
          <article className="content-help">
            <header className="places-header-help">
              <h3>Factory</h3>
              <hr className="underline-places-help-left" />
            </header>
            <p className="place-description-help">
              Some planets have factories that are a very important part of the
              space industry. Here, teams of robot-assisted engineers build
              rockets, spacecrafts, and components that you can use. For the
              appropriate amount of credits, the team will be happy to upgrade
              your rocket, as long as you provide the right amount of resources.
              A higher rocket level will give you access to more planets and
              places that will allow you to increase your game progress.
            </p>
          </article>
          <picture className="image fit padding-1rem desktop">
            <source srcSet={rocket_webp} type="image/webp" />
            <source srcSet={rocket_png} type="image/png" />
            <img
              src={rocket_png}
              type="image/png"
              width="100em"
              height="auto"
              alt={
                "A large robot and a space rocket, as well as a night and stars in the background. A factory logo."
              }
            />
          </picture>
        </section>
        <section className="place-split-help">
          <picture className="image fit padding-1rem">
            <source srcSet={ufo_webp} type="image/webp" />
            <source srcSet={ufo_png} type="image/png" />
            <img
              src={ufo_png}
              type="image/png"
              width="100em"
              height="auto"
              alt={
                "Several black and menacing looking UFO ships on a yellow background. A UFO logo."
              }
            />
          </picture>
          <article className="content-help">
            <header className="places-header-help">
              <hr className="underline-places-help-right" />
              <h3>Combat</h3>
            </header>
            <p className="place-description-help">
              Sometimes you have to face an opponent who seems much stronger -
              even risking all your belongings. By deciding to fight a UFO, you
              will not only inquire a favor to the inhabitants of the galaxy,
              but you can also get rich. But if you lose, you will lose all your
              inventory. You decide for yourself if it's worth it, even if you
              lose once, maybe you will finally succeed, there are many enemy
              ships in the galaxy.
            </p>
          </article>
        </section>
        <section className="place-split-help">
          <picture className="image fit padding-1rem mobile">
            <source srcSet={mine_webp} type="image/webp" />
            <source srcSet={mine_png} type="image/png" />
            <img
              src={mine_png}
              type="image/png"
              width="100em"
              height="auto"
              alt={props.alt}
            />
          </picture>
          <article className="content-help">
            <header className="places-header-help">
              <h3>Mining</h3>
              <hr className="underline-places-help-left" />
            </header>
            <p className="place-description-help">
              The small fee for a one-time entry to the mine is not too high if
              you take into account what you can get in return if you are lucky.
              In mines, apart from items that can be easily sold, you can find
              raw materials for upgrading the rocket.
            </p>
          </article>
          <picture className="image fit padding-1rem desktop">
            <source srcSet={mine_webp} type="image/webp" />
            <source srcSet={mine_png} type="image/png" />
            <img
              src={mine_png}
              type="image/png"
              width="100em"
              height="auto"
              alt={
                "A large chunk of rock with pink crystal fragments stuck in it. A mine logo."
              }
            />
          </picture>
        </section>
        <section className="place-split-help">
          <picture className="image fit padding-1rem">
            <source srcSet={university_webp} type="image/webp" />
            <source srcSet={university_png} type="image/png" />
            <img
              src={university_png}
              type="image/png"
              width="100em"
              height="auto"
              alt={"A diploma with a blue ribbon. A university logo."}
            />
          </picture>
          <article className="content-help">
            <header className="places-header-help">
              <hr className="underline-places-help-right" />
              <h3>University</h3>
            </header>
            <p className="place-description-help">
              At universities, you can take on one of the challenges of
              completing the text with relevant passages. The professors will be
              happy to prepare interesting texts, for the completion of which
              you will receive a prize. If you want, you can prepare your own
              supplementary text and take the challenge. Let it not be too easy
              - you will only get rewards for challenges prepared by
              universities.
            </p>
          </article>
        </section>
        <section className="place-split-help">
          <picture className="image fit padding-1rem mobile">
            <source srcSet={quiz_webp} type="image/webp" />
            <source srcSet={quiz_png} type="image/png" />
            <img
              src={quiz_png}
              type="image/png"
              width="100em"
              height="auto"
              alt={"A thick red book. A school logo."}
            />
          </picture>
          <article className="content-help">
            <header className="places-header-help">
              <h3>School</h3>
              <hr className="underline-places-help-left" />
            </header>
            <p className="place-description-help">
              There is a school on every planet, smaller or larger, but there
              is. You can learn something here. You can also try to guess a word
              from its description - teachers love such puzzles. Solving quizzes
              is a great way to gain experience and credits. In stores you can
              buy an item that will discover a word for you that you can use if
              you run out of ideas.
            </p>
          </article>
          <picture className="image fit padding-1rem desktop">
            <source srcSet={quiz_webp} type="image/webp" />
            <source srcSet={quiz_png} type="image/png" />
            <img
              src={quiz_png}
              type="image/png"
              width="100em"
              height="auto"
              alt={"A thick red book. A school logo."}
            />
          </picture>
        </section>
        <section className="place-split-help">
          <picture className="image fit padding-1rem">
            <source srcSet={satelite_webp} type="image/webp" />
            <source srcSet={satelite_png} type="image/png" />
            <img
              src={satelite_png}
              type="image/png"
              width="100em"
              height="auto"
              alt={"A white-gray satellite."}
            />
          </picture>
          <article className="content-help">
            <header className="places-header-help">
              <hr className="underline-places-help-right" />
              <h3>Favorites</h3>
            </header>
            <p className="place-description-help">
              After completing the quiz, the words you are interested in can be
              added to the favorites tab, which you can refer to at any time
              during the game. You can easily edit the list of favorite words
              with their definitions at any time.
            </p>
          </article>
        </section>
        <button className="button small">
          <Link to={handleGoBack} style={{ textDecoration: "none" }}>
            Go Back
          </Link>
        </button>
      </main>
      <Footer />
    </div>
  );
};

export default Help;
