import React, { useRef, useEffect, useState } from "react";
import styles from "./Hotspot.module.css";

const Hotspot = ({
  id,
  top,
  left,
  product,
  onClick,
  onMove,
  isAdmin,
  isEditing,
  isNew,
}) => {
  const hotspotRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const editingClass = isEditing ? styles.hotspotEditing : "";
  const newClass = isNew ? styles.hotspotNew : "";

  useEffect(() => {
    if (!isEditing || !onMove) return;

    const currentHotspot = hotspotRef.current;
    let container = currentHotspot?.parentElement;

    const handleMouseDown = (e) => {
      if (!isEditing) return;
      e.stopPropagation();
      e.preventDefault();
      setIsDragging(true);

      if (!container || !container.getBoundingClientRect) {
        container = currentHotspot.parentElement;
      }
    };

    const handleMouseMove = (e) => {
      if (!isDragging || !container) return;

      const rect = container.getBoundingClientRect();

      let x = e.clientX - rect.left;
      let y = e.clientY - rect.top;

      x = Math.max(0, Math.min(x, rect.width));
      y = Math.max(0, Math.min(y, rect.height));

      const newLeft = ((x / rect.width) * 100).toFixed(1);
      const newTop = ((y / rect.height) * 100).toFixed(1);

      onMove(id, Number(newTop), Number(newLeft));
    };

    const handleMouseUp = () => {
      if (isDragging) setIsDragging(false);
    };

    currentHotspot.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      currentHotspot.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isEditing, isDragging, onMove, id]);

  
  const handleHotspotClick = (e) => {
    e.stopPropagation();
    if (isDragging) return;
    if (onClick && product) onClick(product);
  };

  return (
    <button
      ref={hotspotRef}
      className={`${styles.hotspot} ${editingClass} ${newClass}`}
      style={{
        top: `${top}%`,
        left: `${left}%`,
        cursor: isEditing ? "grab" : "pointer",
        position: "absolute",
        transform: "translate(-50%, -50%)",
      }}
      onClick={handleHotspotClick}
      title={
        isEditing
          ? `Mover hotspot (Top: ${top}%, Left: ${left}%)`
          : `Ver ${product?.name || "Hotspot"}`
      }
      data-dragging={isDragging ? "true" : "false"}
    >
      <span
        className={isEditing ? styles.hotspotInnerAdmin : styles.hotspotInner}
      >
        {isEditing ? "⚙️" : "●"}
      </span>
    </button>
  );
};

export default Hotspot;
