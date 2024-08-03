import { useSelector } from "react-redux";
import { selectChatByChatId } from "../../redux/chat/chatSlice";
import {
  setCurrentChatIdToRedux,
  setCurrentChatUserToRedux,
} from "../../redux/chat/utils";
import photo from "../../assets/images/defaultPhoto.jpg";

const ChatListItem = ({ user, userChatId }) => {
  const { currentChatId } = useSelector((state) => state.chat);
  const chat = useSelector((state) => selectChatByChatId(state, userChatId));

  const handleClick = () => {
    setCurrentChatUserToRedux(user);
    setCurrentChatIdToRedux(userChatId);
  };

  const isCurrentChat = currentChatId === userChatId;

  return (
    <div
      onClick={handleClick}
      className={`flex max-sm:flex-col p-2 sm:p-3 items-center gap-3 text-white hover:bg-black/40 cursor-pointer transition duration-300 ${
        isCurrentChat ? "bg-black/40" : ""
      }`}
    >
      <img
        className="w-12 h-12 max-sm:h-10 max-sm:w-10 rounded-full object-cover object-center"
        src={user?.photoURL || photo}
        alt=""
      />
      <div className="flex justify-between items-center w-full">
        <div>
          <span className="font-bold text-lg hover:underline max-sm:text-sm line-clamp-1 break-all">
            {user?.displayName}
          </span>
          <p className="max-sm:hidden text-slate-300 text-xs line-clamp-1 break-all">
            {chat?.chatList.slice(-1)[0]?.message}
          </p>
        </div>
        <p className="max-sm:hidden text-xs text-slate-300 text-nowrap">
          {new Date(chat?.chatList.slice(-1)[0]?.time).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </div>
  );
};

export default ChatListItem;
