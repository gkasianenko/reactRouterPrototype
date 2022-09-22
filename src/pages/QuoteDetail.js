import { useEffect } from "react";
import { useParams, Route, Link, useRouteMatch } from "react-router-dom";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import LoadingSpinner from "../components/UI/LoadingSpinner";

import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";

// const DUMMY_QUOTES = [
//   { id: "q1", author: "Pussy", text: "Oh cock boy" },
//   { id: "q2", author: "Titty", text: "Oh dick man" },
// ];

const QuoteDetail = () => {
  const params = useParams();
  const { quoteId } = params;

  const {
    sendRequest,
    data: loadedQuote,
    error,
    status,
  } = useHttp(getSingleQuote, true);

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  //Динамически создаем пути в компонентах ---> Хук useRouterMatch делает парсинг на соответствие с URL так же ,как компонент Route, но в этом случае, ROute создавать не надо. Получается через match компоненты дети получают пути от компонентов в App.js
  const match = useRouteMatch();
  console.log(match);

  //Здесь мы находим в массиве конкретный элемент по айди из параметров url
  // const quote = loadedQuote.find((quote) => quote.id === params.quoteId);

  //Обязательно выводить сообщение, если цитата не найдена

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (!loadedQuote.text) {
    return <p>No quote found!</p>;
  }

  if (error) {
    return <p className="centered">{error}</p>;
  }

  //Пути в route можно передавать динамически через {}. Конкретно тут мы собираем параметры URL через useParams и передаем значение обозначенного нами динамического ключа "/quotes/:quoteId"

  //Рендер в зависимости от URL --> Здесь руты устроены так, что фрагмент show comments рендерится только если в URL еще нет /comments, иначе - убирается.
  return (
    <section>
      <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
      <Route path={match.path} exact>
        <div className="centered">
          <Link className="btn--flat" to={`${match.url}/comments`}>
            Show Comments
          </Link>
        </div>
      </Route>

      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </section>
  );
};

export default QuoteDetail;
