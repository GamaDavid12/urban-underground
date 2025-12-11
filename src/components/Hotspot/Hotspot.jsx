import styles from './Hotspot.module.css';
import React, { useRef, useState } from 'react';

const Hotspot = ({ top, left, product, onClick, isAdmin = false, onDragEnd, hotspotId }) => { 
    
    const hotspotRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [wasDragged, setWasDragged] = useState(false); 

    if (!isAdmin) {
        return (
            <button
                className={styles.hotspot}
                style={{ top: `${top}%`, left: `${left}%` }}
                onClick={() => onClick(product)}
                title={`Ver ${product.name}`}
            >
                <span className={styles.hotspotInner}></span> 
            </button>
        );
    }

    const handleMouseDown = (e) => {
        e.stopPropagation();
        if (!onDragEnd) return; 

        setWasDragged(false); 
        setIsDragging(true);

        const startX = e.clientX;
        const startY = e.clientY;
        const container = hotspotRef.current.parentElement;
        const rect = container.getBoundingClientRect();
        
        const currentLeft = parseFloat(hotspotRef.current.style.left);
        const currentTop = parseFloat(hotspotRef.current.style.top);
        
        let newLeft = currentLeft;
        let newTop = currentTop;

        const handleMouseMove = (moveEvent) => {
            if (!hotspotRef.current.classList.contains(styles.isDragging)) {
                 hotspotRef.current.classList.add(styles.isDragging);
            }
            setWasDragged(true); 

            const deltaX = moveEvent.clientX - startX;
            const deltaY = moveEvent.clientY - startY;

            const deltaLeftPercent = (deltaX / rect.width) * 100;
            const deltaTopPercent = (deltaY / rect.height) * 100;

            newLeft = Math.min(100, Math.max(0, currentLeft + deltaLeftPercent));
            newTop = Math.min(100, Math.max(0, currentTop + deltaTopPercent));

            hotspotRef.current.style.left = `${newLeft}%`;
            hotspotRef.current.style.top = `${newTop}%`;
        };

        const handleMouseUp = () => {
            setIsDragging(false);
            hotspotRef.current.classList.remove(styles.isDragging);

            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            
            if (wasDragged) {
                onDragEnd({ 
                    id: hotspotId,
                    newTop: newTop.toFixed(2), 
                    newLeft: newLeft.toFixed(2) 
                });
            }
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    const handleClick = (e) => {
        if (wasDragged) {
            e.stopPropagation();
            return;
        } 
        e.stopPropagation(); 
        onClick({ id: hotspotId, top: top, left: left }); 
    }
    
    return (
        <div
            ref={hotspotRef}
            className={`${styles.hotspotAdmin} HotspotAdmin ${isDragging ? styles.isDragging : ''}`} 
            style={{ top: `${top}%`, left: `${left}%` }}
            onClick={handleClick}
            onMouseDown={handleMouseDown} 
            title={`ADMIN: Mover Hotspot ID: ${hotspotId} | Producto: ${product.name}`}
        >
             <div className={styles.hotspotHandle}></div>
        </div>
    );
};

export default Hotspot;