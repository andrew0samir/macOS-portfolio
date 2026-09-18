import { WindowControls } from "@components";
import { locations } from "@constants";
import WindowWrapper from "@hoc/WindowWrapper";
import useWindowStore from "@store/window";

const Trash = () => {
  const { openWindow } = useWindowStore();

  return (
    <>
      <div id="window-header">
        <WindowControls target="trash" />
        <h2>Archive</h2>
      </div>

      <div className="bg-white flex h-100">
        <ul className="content bg-white flex h-full">
          {locations.trash.children?.map((item) => (
            <li
              key={item.id}
              className={`${item.position} cursor-pointer`}
              onClick={() => openWindow(`${item.fileType}${item.kind}`, item)}
            >
              <img src={item.icon} alt={item.name} />
              <p>{item.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

const TrashWindow = WindowWrapper(Trash, "trash");
export default TrashWindow;
