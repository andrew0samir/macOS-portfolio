import { WindowControls } from "@components";
import WindowWrapper from "@hoc/WindowWrapper";
import useWindowStore from "@store/window";

const Text = () => {
  const { windows } = useWindowStore();
  const { data } = windows.txtfile;

  if (!data) return null;

  const { name, image, subtitle, description } = data;

  return (
    <>
      <div id="window-header">
        <WindowControls target="txtfile" />
        <h2>{name}</h2>
      </div>

      <div className="text-content-wrapper overflow-y-auto h-full p-4 bg-white">
        {image && (
          <img src={image} alt={name} className="w-full mb-4 rounded" />
        )}

        {subtitle && <h3 className="text-lg font-semibold mb-4">{subtitle}</h3>}

        {description && Array.isArray(description) && (
          <div className="space-y-4">
            {description.map((paragraph, index) => (
              <p
                key={index}
                className=" space-y-2 text-sm leading-relaxed  text-gray-700"
              >
                {paragraph}
              </p>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

const TextWindow = WindowWrapper(Text, "txtfile");

export default TextWindow;
