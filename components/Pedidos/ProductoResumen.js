import React, { useContext, useState, useEffect } from "react";
import PedidoContext from "../../context/Pedidos/PedidoContext";

export const ProductoResumen = ({ producto }) => {
	const pdoCtx = useContext(PedidoContext);
	const { cantProd, updTotal } = pdoCtx;

	const [cantidad, setCantidad] = useState(0);

	useEffect(() => {
		updCant();
		updTotal();
	}, [cantidad]);

	const updCant = () => {
		const newProd = { ...producto, cantidad: Number(cantidad)}
		cantProd(newProd);
	}

	const { nombre, precio } = producto;

	return (
		<div className="md:flex md:justify-between md:items-center mt-5">
			<div className="md:w-2/4 mb-2 md:mb-0">
				<p className="text-sm">{nombre}</p>
				<p>$ {precio}</p>
			</div>

			<input
				type="number"
				placeholder="Cantidad"
				className="shadow apperance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline md:ml-4"
				value={cantidad}
				onChange={(e) => setCantidad(e.target.value)}
			/>
		</div>
	);
};
