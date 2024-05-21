import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export const Sidebar = () => {
    const router = useRouter();

	return (
		<aside className="bg-gray-800 sm:w-1/3 xl:w-1/5 sm:min-h-screen p-5">
			<div>
				<p className="text-white tex-2xl font-black">CRM Clientes</p>
			</div>

			<nav className="mt-5 list-none">
				<li className={router.pathname === "/" ? "bg-blue-800 p-2" : "p-2"}>
					<Link href="/">
						<a className="text-white block">Clientes</a>
					</Link>
				</li>
				<li className={router.pathname === "/Pedidos" ? "bg-blue-800 p-2" : "p-2"}>
					<Link href="/Pedidos">
						<a className="text-white block">Pedidos</a>
					</Link>
				</li>
				<li className={router.pathname === "/Productos" ? "bg-blue-800 p-2" : "p-2"}>
					<Link href="/Productos">
						<a className="text-white block">Productos</a>
					</Link>
				</li>
			</nav>


			<div className="sm:mt-10">
				<p className="text-white tex-2xl font-black">Otras opciones</p>
			</div>

			<nav className="mt-5 list-none">
				<li className={router.pathname === "/MejoresVendedores" ? "bg-blue-800 p-2" : "p-2"}>
					<Link href="/MejoresVendedores">
						<a className="text-white block">Mejores Vendedores</a>
					</Link>
				</li>
				<li className={router.pathname === "/MejoresClientes" ? "bg-blue-800 p-2" : "p-2"}>
					<Link href="/MejoresClientes">
						<a className="text-white block">Mejores Clientes</a>
					</Link>
				</li>
			</nav>
		</aside>
	);
};
