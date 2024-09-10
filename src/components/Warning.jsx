import { div } from "three/webgpu";

function Warning({ showWarning, closeWarning, onHome }) {
  if (!showWarning) {
    return null;
  }
  const handleCancel = () => {
    closeWarning();
  };
  const handleHome = () => {
    onHome();
  };
  return (
    <div className="warning">
      <div className="warning-modal">
        <div className="upper-warning">
          <p>Warning</p>
          <p>Progress will be erased if you go back</p>
        </div>
        <div className="lower-warning">
          <button onClick={handleCancel}>Cancel</button>
          <button onClick={handleHome}>Continue</button>
        </div>
      </div>
    </div>
  );
}

export default Warning;
