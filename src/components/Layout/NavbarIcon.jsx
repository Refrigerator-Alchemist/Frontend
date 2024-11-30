export default function NavbarIcon({
  iconStyle,
  onClick,
  selected,
  type,
  icon,
  activeIcon,
}) {
  return (
    <div
      onClick={onClick}
      className={`${iconStyle} ${selected === type ? 'selected-icon' : ''}`}
    >
      {selected === type ? activeIcon : icon}
    </div>
  );
}
