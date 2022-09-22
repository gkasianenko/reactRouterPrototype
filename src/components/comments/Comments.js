import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";

import classes from "./Comments.module.css";
import NewCommentForm from "./NewCommentForm";
import useHttp from "../../hooks/use-http";
import { getAllComments } from "../../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";
import CommentsList from "./CommentsList";

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const params = useParams();
  const { quoteId } = params;

  const {
    sendRequest,
    data: loadedComments,
    status,
    error,
  } = useHttp(getAllComments, true);

  useEffect(() => {
    sendRequest(quoteId);
  }, [quoteId, sendRequest]);

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  //Эту функцию через пропс мы передаем дальше в компонент NewCommentForm. Нужно обернуть его в usecallback, чтобы не получился бесконечный цикл пересозданий. В компоненте NewCommentForm эта функция указана как зависимость useEffect. Поскольку при рендере функции как бы создаются заново, эта функция перезаписывалась бы, useeffect бы считывал изменение функции и снова перезаписывал
  const addedCommentHandler = useCallback(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  //Здесь динамически рендерим секцию комментов, исходя из статуса азпроса http
  let comments;
  if (status === "pending") {
    comments = (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (status === "completed" && (loadedComments || loadedComments.length > 0)) {
    comments = <CommentsList comments={loadedComments} />;
  }

  if (
    status === "completed" &&
    (!loadedComments || loadedComments.length === 0)
  ) {
    comments = <p className="centered">Еще нет комментариев :(</p>;
  }

  //OnAddedComment - должна срабатывать при отправке комментария внутри компонента NewCommentForm
  //А quoteId передается там же внутрь запроса отправки коммента на сервак, чтобы к этому id привязать коммент
  return (
    <section className={classes.comments}>
      <h2>Комментарии:</h2>
      {!isAddingComment && (
        <button className="btn" onClick={startAddCommentHandler}>
          Добавить
        </button>
      )}
      {isAddingComment && (
        <NewCommentForm
          quoteId={quoteId}
          onAddedComment={addedCommentHandler}
        />
      )}
      {comments}
    </section>
  );
};

export default Comments;
