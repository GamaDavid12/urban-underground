import Hotspot from "../../components/Hotspot/Hotspot.jsx"; 
import { hotspotPositions } from '../../Mocks/hotspotsMock.js';
import { allProductsData } from '../../Mocks/productsMock.js'; 

const AdminHomePage = () => {
    //  array de todos los productos
    const allProducts = Object.values(allProductsData).flatMap(cat => cat.products);

    const handleHotspotAdminClick = (hotspotData) => {
       
        const product = allProducts.find(p => p.id === hotspotData.productId);

        console.log("Hotspot clicado en modo Admin para el producto:", product?.name, "Posición:", hotspotData.top, hotspotData.left);

        alert(`ADMIN: Gestionar Hotspot ID ${hotspotData.id}\nProducto: ${product?.name || 'No Encontrado'}\nTop: ${hotspotData.top}%, Left: ${hotspotData.left}%`);
    };

    return (
        <div className="p-4 md:p-8 bg-gray-900 text-white min-h-screen"> 
            
            <h1 className="text-3xl font-bold mb-6 text-yellow-400">
                Gestión de Hotspots de la Página de Inicio
            </h1>
            <p className="text-gray-400 mb-8">
                Haz clic en cualquier punto rojo para gestionar el producto enlazado o editar su posición (Top/Left).
            </p>

            <div className="relative w-full h-[75vh] border-4 border-red-500 overflow-hidden mx-auto shadow-2xl"> 
                
                <img 
                    src="/HomePage.png" 
                    alt="Urban Underground Home Admin View" 
                    className="absolute top-0 left-0 w-full h-full object-cover z-0" 
                />
                
                {hotspotPositions.map((hotspot) => {
                   
                    const productData = allProducts.find(p => p.id === hotspot.productId);

                    return (
                        <Hotspot 
                            key={hotspot.id} 
                            top={hotspot.top} 
                            left={hotspot.left} 
                            product={productData || { id: hotspot.productId, name: 'Producto Desconocido' }} 
                            onClick={() => handleHotspotAdminClick(hotspot)} 
                            isAdmin={true}
                        />
                    );
                })}
            </div>
            
        </div>
    );
};

export default AdminHomePage;
