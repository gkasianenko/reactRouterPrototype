import { Fragment } from "react";
import { useHistory, useLocation } from "react-router-dom";

import QuoteItem from "./QuoteItem";
import classes from "./QuoteList.module.css";

const sortQuotes = (quotes, ascending) => {
  return quotes.sort((quoteA, quoteB) => {
    if (ascending) {
      return quoteA.id > quoteB.id ? 1 : -1;
    } else {
      return quoteA.id < quoteB.id ? 1 : -1;
    }
  });
};

const QuoteList = (props) => {
  const history = useHistory();
  const location = useLocation();

  //Здесь используем хук useHistory, чтобы изменить URL страницы. Мы добавляем querie параметры, чтобы остаться на этой же странице, но отсортировать данные. Получается, что мы нажимаем кнопку сортировки, потом в историю пушится URL, а поскольку мы уже на этом URL, компонент просто перерендерится.
  //Хук useLocation возвращает объект Location react routerа, который отображает информацию о текущем загруженном URL

  //Создаем класс URLSearchParams web API через конструктор, чтобы получить возможность пользоваться методами URLSearchParams. И передаем в него данные параметров поиска из location.search
  const queryParams = new URLSearchParams(location.search);

  //Проверяем, совпадает ли значение в URL с нужным нам
  const isSortingAscending = queryParams.get("sort") === "asc";

  const sortedQuotes = sortQuotes(props.quotes, isSortingAscending);

  const changeSortingHandler = () => {
    //C useHistory можно использовать объекты для работы методов. Вместо создания одной длинной строки, можно передать как объект по частям
    history.push({
      pathname: location.pathname,
      search: `?sort=${isSortingAscending ? "desc" : "asc"}`,
    });

    // history.push(`${location.pathname}?sort=${(isSortingAscending ? "desc" : "asc")}`);
  };

  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={changeSortingHandler}>
          Сорт. {isSortingAscending ? "по убыванию" : "по возрастанию"}
        </button>
      </div>
      <ul className={classes.list}>
        {props.quotes.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default QuoteList;
