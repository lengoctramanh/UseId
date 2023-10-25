import { Fragment, useEffect, useRef, useState } from "react";
import "./App.css";
import { useId } from "react";
import axios from "axios";
const App = () => {
  const inputId = useId();// Generate an unique Id  

  const [data, setData] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const inputRef = useRef();

  const [input, setInput] = useState("");

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleFetchData = async (endpoint) => {
    setIsLoading(true);//Đang loading
    axios
      .get(`https://jsonplaceholder.typicode.com/${endpoint}`)
      .then((res) => {
        setData(res.data);
        setIsLoading(false);//Có API rồi không cần loading nữa
      });
  };
/** + Nếu không có chuỗi đầu vào nào xuất hiện trong các thuộc tính title, name hoặc phone của đối tượng
 * thì trả về giá trị false
 */
  const filterData = () => {
    if (input && data.length > 0) {
      return data.filter((result) => {
        return (
          // Kết quả của biểu thức luôn trả về false or true
          (result.title?.toLowerCase().includes(input.toLowerCase()) ||
            result.name?.toLowerCase().includes(input.toLowerCase()) ||
            result.phone?.toLowerCase().includes(input.toLowerCase())) ??
          false
        );
      });
    }
// + toLowerCase() chuyển đổi cả chuỗi đầu vào và các giá trị trong đối tượng thành chữ thường
// + Sau đó kiểm tra xem chuỗi đầu vào có xuất hiện trong các thuộc tính title, name hoặc phone
//của đối tượng hay không.
// + includes trả về true và false
    console.log(data, "======");
    return data;
  };
/**Toán tử ??(a??b)
 * + Kiểm tra xem giá trị bên trái a  là null hoặc undefined hay không.
 * + Nếu a là null hoặc undefined thì trả về giá trị bên phải b
 * + Ngược lại, nếu a khác null hoặc undefined thì trả về giá trị bên trái a
 */
  useEffect(() => {
    inputRef.current.focus();
    handleFetchData("users");
  }, []);

  const handleClearInput=()=> {
    inputRef.current.focus()
    setInput("")//Xóa chũ cái khi nhập vào input
  }

  const handleClearData=()=> {
setData([])// Trả về mảng rỗng ban đầu
setIsLoading(false)// Không cần loading nữa
  }

  return (
    <Fragment>
      <label htmlFor={inputId}>Search</label>
      <input
        type="search"
        placeholder="Type here..."
        id={inputId}
        onChange={handleChange}
        ref={inputRef}
        value={input}
      />
      <button onClick={() => handleFetchData(`posts?q=${input}`)}>Post</button>
      <button onClick={() => handleFetchData("comments")}>Comments</button>
      <button onClick={() => handleFetchData("users")}>Users</button>
      <button onClick={handleClearInput}>ClearInput</button>
      <button onClick={handleClearData}>ClearData</button>
      {isLoading ? (
        <div>
          <p>Loading...</p>
        </div>
      ) : (
        <> 
          <ul> {/** cha là ul bọc các con li, nhiều li lúc đó mới dùng method map */}
            {filterData().map((item) => 
              <li key={item.id}>{item.name || item.title || item.website}</li>
            )}
          </ul>
        </>
      )}
    </Fragment>
  );
};

export default App;
