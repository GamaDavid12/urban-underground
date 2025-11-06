import React, { useRef, useEffect, useState } from 'react';
import styles from './Hotspot.module.css';

const Hotspot = ({ id, top, left, product, onClick, onMove, isAdmin, isEditing, isNew }) => {
    const hotspotRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    
    const editingClass = isEditing ? styles.hotspotEditing : '';
    const newClass = isNew ? styles.hotspotNew : '';

    useEffect(() => {
        if (!isEditing || !onMove) return;

        const currentHotspot = hotspotRef.current;
        let container = currentHotspot.parentElement;
        
        const handleMouseDown = (e) => {
            e.stopPropagation(); 
            e.preventDefault(); 
            setIsDragging(true);

            if (!container || container.className.indexOf('relative w-full') === -1) {
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

            const newLeft = Math.round((x / rect.width) * 100);
            const newTop = Math.round((y / rect.height) * 100);

            onMove(id, newTop, newLeft);
        };

        const handleMouseUp = () => {
            if (isDragging) {
                setIsDragging(false);
            }
        };

        currentHotspot.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            currentHotspot.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isEditing, isDragging, onMove, id]);
    
    const handleHotspotClick = (e) => {
        e.stopPropagation(); 
        if (isDragging) {
            return; 
        }
        onClick(product);
    };


    return (
        <button
            ref={hotspotRef}
            className={`${styles.hotspot} ${editingClass} ${newClass}`}
            style={{ top: `${top}%`, left: `${left}%`, cursor: isEditing ? 'grab' : 'pointer' }}
            onClick={handleHotspotClick}
            title={isEditing ? `Mover ${product.name} (Top: ${top}%, Left: ${left}%)` : `Ver ${product.name}`}
            data-dragging={isDragging ? 'true' : 'false'} 
        >
             <span className={isEditing ? styles.hotspotInnerAdmin : styles.hotspotInner}>
                {isEditing && '⚙️'}
            </span>
        </button>
    );
};

export default Hotspot;