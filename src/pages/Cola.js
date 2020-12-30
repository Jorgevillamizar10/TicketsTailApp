import React, { useContext, useState, useEffect } from "react";
import { useHideMenu } from "../hooks/useHideMenu";
import { SocketContext } from "../context/SocketContext";

import { Col, Row, Typography, List, Card, Tag, Divider } from "antd";
import { getUltimos } from "../helpers/getUltimos";

const { Title, Text } = Typography;

export const Cola = () => {
	useHideMenu(true);

	const { socket } = useContext(SocketContext);
	const [tickets, setTickets] = useState([]);

	useEffect(() => {
		//escuchando el socket que emite el back guardando la data en asignados
		socket.on("ticket-asignado", (asignados) => {
			//la cargamos en un estado local que contiene un array vacio por defecto
			setTickets(asignados);
		});

		return () => {
			socket.off("ticket-asignado");
		};
	}, [socket]);

	useEffect(() => {
		//el .then por que es una promesa y no podemos usar en el useEffect async/await
		getUltimos().then((tickets) => setTickets(tickets)); //-> cargamos el nuestro estado con la peticion post cada vez que se recarga la pagina con los ultimos 13 tickets
	}, []);

	return (
		<>
			<Title level={1}>Atendiendo al cliente</Title>
			<Row>
				<Col span={12}>
					<List
						dataSource={tickets.slice(0, 3)}
						renderItem={(
							item //renderItem es un ciclo
						) => (
							<List.Item>
								<Card
									style={{ width: 300, marginTop: 16 }}
									actions={[
										<Tag color="volcano">{item.agente}</Tag>,
										<Tag color="magenta">Escritorio: {item.escritorio}</Tag>,
									]}
								>
									<Title>No. {item.numero}</Title>
								</Card>
							</List.Item>
						)}
					/>
				</Col>
				<Col span={12}>
					<Divider>Historial</Divider>
					<List
						dataSource={tickets.slice(3)}
						renderItem={(item) => (
							<List.Item>
								<List.Item.Meta
									title={`ticket No. ${item.numero}`}
									description={
										<>
											<Text type="secondary"> En el escritorio</Text>
											<Tag color="magenta"> {item.numero}</Tag>
											<Text type="secondary"> Agente:</Text>
											<Tag color="volcano"> {item.agente}</Tag>
										</>
									}
								/>
							</List.Item>
						)}
					/>
				</Col>
			</Row>
		</>
	);
};
