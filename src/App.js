import React, { Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Layout from "./components/layout/Layout";
import LoadingSpinner from "./components/UI/LoadingSpinner";

//Это синтаксиси lazy подгрузки компонентов в приложение. Подгрузка будет только если компонент вызовется пользователем в процессе использования. Загрузка стала динамической, в отличие от того, что ниже в App.js - там загружаться будет все сразу скопом
//Suspense - компонент из реакта, который покажет fallback, если lazy-загрузка компонента занимает дольше обычного, чтобы не крякнулось приложение
const NewQuote = React.lazy(() => import("./pages/NewQuote"));
const QuoteDetail = React.lazy(() => import("./pages/QuoteDetail"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const AllQuotes = React.lazy(() => import("./pages/AllQuotes"));

function App() {
  return (
    <Layout>
      <Suspense
        fallback={
          <div className="centered">
            <LoadingSpinner />
          </div>
        }
      >
        <Switch>
          <Route path="/" exact>
            <Redirect to="/quotes" />
          </Route>
          <Route path="/quotes" exact>
            <AllQuotes />
          </Route>
          <Route path="/quotes/:quoteId">
            <QuoteDetail />
          </Route>
          <Route path="/new-quote">
            <NewQuote />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Suspense>
    </Layout>
  );
}

//Route ссылающийся на * - ставится последним и отрабатывает страницей 404. Звездочка обозначает ВСЕ сочетания url при парсинге, но поскольку она стоит самой последней, сработает только если ни один из route не подошел при парсинге по url

export default App;
