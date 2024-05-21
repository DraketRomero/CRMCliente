import React, { useContext } from "react";
import PedidoContext from "../../context/Pedidos/PedidoContext";
import { ProductoResumen } from "./ProductoResumen";

export const ResumenPedido = () => {
	// Context de pedidos
	const pdoCtx = useContext(PedidoContext);
	const { productos } = pdoCtx;

	return (
		<>
			<p className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold">
				3.- Ajusta las cantidades del producto?
			</p>

			{productos.length > 0 ? (
				<>
					{
                        productos.map(producto => (
                            <ProductoResumen key={producto.id} producto={producto}/>
                        ))
                    }
				</>
			) : (
				<>
					<p className="mt-5 text-sm"> Aun no hay productos.</p>
				</>
			)}
		</>
	);
};
