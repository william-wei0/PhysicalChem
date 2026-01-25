import "./styles/closeButtonSpinning.css"

export default function CloseButtonSpinning({ onClick } :{ onClick : ()=>void}) {
  return (
    <button className="xBtn" onClick={onClick} aria-label="Close">
      <span className="xLine a" />
      <span className="xLine b" />
    </button>
  );
}