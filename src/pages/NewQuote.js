import { useEffect } from "react";
import { useHistory } from "react-router";
import QuoteForm from "../components/quotes/QuoteForm";
import useHttp from "../hooks/use-http";
import { addQuote } from "../lib/api";

const NewQuote = () => {
  const history = useHistory();
  const{sendRequest, status} = useHttp(addQuote);

  useEffect(() => {

    if(status === "completed"){
      //useHistory возвращает инстанс истории приложения. С помощью этого хука можно добавлять/заменять страницы в текущем инстансе приложения. Здесь мы после отработки функции открываем пользователю страницу /quotes. Как бы добавляя в инстанс прилождения сверху. Это называется запрограммированной навигацией.
      history.push("/quotes");
    }

  }, [status, history]);

  const addQuoteHandler = (quoteData) => {
    sendRequest(quoteData);

   
  };

  //В компоненте формы уже есть бегунок загрузки, который показывается в зависимости от значения isLoading в props
  return <QuoteForm isLoading={status === "pending"} onAddQuote={addQuoteHandler} />;
};

export default NewQuote;
