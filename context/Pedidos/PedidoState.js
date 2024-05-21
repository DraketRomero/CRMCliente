import React, { useReducer } from "react";
import PedidoContext from "./PedidoContext";
import PedidoReducer from "./PedidoReducer";
import {
	SELECCIONAR_CLIENTE,
	SELECCIONAR_PRODUCTO,
	CANTIDAD_PRODUCTOS,
	ACTUALIZAR_TOTAL,
} from "./../../types";

export const PedidoState = ({ children }) => {
	const initialState = {
		cliente: {},
		productos: [],
		total: 0,
	};

	const [state, dispatch] = useReducer(PedidoReducer, initialState);

	// Modifica el cliente
	const addCliente = (cliente) => {
		dispatch({
			type: SELECCIONAR_CLIENTE,
			payload: cliente,
		});
	};

	// Modifica los productos
	const addProd = (prodSelec) => {
		let newState;
		if (state.productos.length > 0) {
			// Tomar del segundo arreglo, una copia para asignarlo al primero
			newState = prodSelec.map((prd) => {
				const newObj = state.productos.find(
					(prdState) => prdState.id === prd.id
				);

				return {
					...prd,
					...newObj,
				};
			});
		} else {
			newState = prodSelec;
		}

		dispatch({
			type: SELECCIONAR_PRODUCTO,
			payload: newState,
		});
	};

	// Modifica las cantidades de los productos
	const cantProd = (cant) => {
		dispatch({
			type: CANTIDAD_PRODUCTOS,
			payload: cant,
		});
	};

	const updTotal = () => {
		dispatch({
			type: ACTUALIZAR_TOTAL,
		});
	};

	return (
		<PedidoContext.Provider
			value={{
				cliente: state.cliente,
				productos: state.productos,
				total: state.total,
				addCliente,
				addProd,
				cantProd,
				updTotal,
			}}
		>
			{children}
		</PedidoContext.Provider>
	);
};
