import Layout from "../common/Layout";
import { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import Popup from "../common/Popup";
import { POSTS_WRITE_REQUEST } from "../../redux/types";
import { useDispatch, useSelector } from "react-redux";

function News() {
  const input = useRef(null);
  const textarea = useRef(null);
  const inputEdit = useRef(null);
  const textareaEdit = useRef(null);
  const [Write, setWrite] = useState(false);
  const editPop = useRef(null);
  const createPop = useRef(null);
  const subTxt =
    "We make digital experiences that use technology to create emotions technology.";
  const getLocalData = () => {
    const data = localStorage.getItem("post");
    return JSON.parse(data);
  };
  const dispatch = useDispatch();
  const news = useSelector((state) => state.NewsReducer.news);

  const [Posts, setPosts] = useState(getLocalData());
  const [Allowed, setAllowed] = useState(true);
  const [EditIdx, setEditIdx] = useState(getLocalData());

  //글 초기화  함수
  const resetPost = () => {
    setWrite(false);
    input.current.value = "";
    textarea.current.value = "";
    if (inputEdit.current) {
      inputEdit.current.value = "";
      textareaEdit.current.value = "";
    }
  };

  //글 저장 함수
  const createPost = () => {
    createPop.current.close();
    if (!input.current.value.trim() || !textarea.current.value.trim()) {
      resetPost();
      return alert("제목과 본문을 모두 입력하세요");
    }
    setPosts([
      { title: input.current.value, content: textarea.current.value },
      ...Posts,
    ]);
    resetPost();
  };

  //글 삭제 함수
  const deletePost = (index) => {
    console.log(index);
    setPosts(Posts.filter((_, idx) => index !== idx));
  };

  //실제 글 수정 함수
  const updatePost = (index) => {
    editPop.current.open();

    setAllowed(true);
    if (!inputEdit.current.value.trim() || !textareaEdit.current.value.trim()) {
      resetPost();
      return alert("수정할 제목과 본문을 모두 입력하세요");
    }

    setPosts(
      Posts.map((post, idx) => {
        if (idx === index) {
          post.title = inputEdit.current.value;
          post.content = textareaEdit.current.value;
          post.enableUpdate = false;
        }
        return post;
      })
    );
  };

  //글 수정모드 변경함수
  const enableUpdate = (index) => {
    if (!Allowed) return;
    setAllowed(false);
    setPosts(
      Posts.map((post, idx) => {
        if (idx === index) post.enableUpdate = true;

        return post;
      })
    );
    setEditIdx(Posts.filter((post, idx) => idx === index));
    console.log(EditIdx);
  };

  //출력모드 변경함수
  const disableUpdate = (index) => {
    editPop.current.close();
    setAllowed(true);
    setPosts(
      Posts.map((post, idx) => {
        if (idx === index) post.enableUpdate = false;
        return post;
      })
    );
  };

  //글쓰기창
  const onWrite = () => {
    setWrite(true);
    createPop.current.open();
  };

  useEffect(() => {
    localStorage.setItem("post", JSON.stringify(Posts));
    console.log(news);
  }, [Posts, EditIdx]);

  return (
    <>
      <Layout name={"News"} title={"News"} subTxt={subTxt}>
        <div className="write">
          <button onClick={onWrite}>Write</button>
        </div>
        <div className="showBox">
          {Posts.map((post, idx) => {
            return (
              <article className="list" key={idx}>
                <span className="num">
                  {idx + 1 < 10 ? `0${idx + 1}` : idx}
                </span>
                <div className="txt">
                  <h3 className="title">{post.title}</h3>
                  <p>{post.content}</p>
                </div>
                <div className="btnSet">
                  <button className="edit" onClick={() => enableUpdate(idx)}>
                    <span className="h">EDIT</span>
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </button>
                  <button className="delete" onClick={() => deletePost(idx)}>
                    <span className="h">DELETE</span>
                    <FontAwesomeIcon icon={faTrashCan} />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </Layout>
      {EditIdx && (
        <Popup ref={editPop}>
          <article>
            <div className="editTxt">
              <input type="text" defaultValue={EditIdx.title} ref={inputEdit} />
              <br />
              <textarea
                cols="30"
                rows="5"
                ref={textareaEdit}
                defaultValue={EditIdx.content}
              ></textarea>
            </div>

            <div className="btnSet">
              <button onClick={() => disableUpdate(EditIdx)}>CANCEL</button>
              <button onClick={() => updatePost(EditIdx)}>SAVE</button>
            </div>
          </article>
        </Popup>
      )}
      {Write && (
        <Popup ref={createPop}>
          <div className="inputBox">
            <input type="text" placeholder="제목을 입력하세요" ref={input} />
            <br />
            <textarea
              cols="30"
              rows="5"
              placeholder="본문을 입력하세요"
              ref={textarea}
            ></textarea>
            <br />

            <div className="btnSet">
              <button onClick={resetPost}>CANCEL</button>
              <button onClick={createPost}>WRITE</button>
            </div>
          </div>
        </Popup>
      )}
    </>
  );
}

export default News;
