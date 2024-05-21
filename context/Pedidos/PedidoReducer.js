import {
	SELECCIONAR_CLIENTE,
	SELECCIONAR_PRODUCTO,
	CANTIDAD_PRODUCTOS,
	ACTUALIZAR_TOTAL,
} from "./../../types";

const changeState = (state, action) => {
	switch (action.type) {
		case SELECCIONAR_CLIENTE:
			return {
				...state,
				cliente: action.payload,
			};
		case SELECCIONAR_PRODUCTO:
			return {
				...state,
				productos: action.payload,
			};
		case CANTIDAD_PRODUCTOS:
			return {
				...state,
				productos: state?.productos?.map((prod) =>
					prod.id === action.payload.id ? (prod = action.payload) : prod
				),
			};
		case ACTUALIZAR_TOTAL:
		return {
			...state,
			total: state.productos.reduce((nuevoTotal, articulo) => nuevoTotal += articulo.precio * articulo.cantidad, 0),
		};
		default:
			return state;
	}
};

export default changeState;
