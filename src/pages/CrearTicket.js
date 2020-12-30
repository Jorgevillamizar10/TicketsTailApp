import React, { useContext, useState } from "react";
import { Row, Col, Typography, Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { useHideMenu } from "../hooks/useHideMenu";
import { SocketContext } from "../context/SocketContext";

const { Title, Text } = Typography;

export const CrearTicket = () => {
	useHideMenu(true);

	const { socket } = useContext(SocketContext);
	const [ticket, setTicket] = useState(null);

	const nuevoTicket = () => {
		//enviando 3 argumentos, en el segundo podria ir la data algun tipo de payload, {id,ect..}
		socket.emit("solicitar-ticket", null, (ticket) => {
			//ojo con el 3 argumento del socket le enviamos un callback que se ejecutara cuando el backend quiera
			setTicket(ticket);
		});
	};

	return (
		<>
			<Row>
				<Col span={14} offset={6} align="center">
					<Title level={3}>Presione el boton para un nuevo ticket</Title>
					<Button
						type="primary"
						shape="round"
						icon={<DownloadOutlined />}
						size="large"
						onClick={nuevoTicket}
					>
						Nuevo Ticket
					</Button>
					{ticket && (
						<Row style={{ marginTop: 100 }}>
							<Col span={14} offset={6} align="center">
								<Text level={2}>Su numero</Text>
								<br />
								<Text type="success" style={{ fontSize: 55 }}>
									{ticket.numero}
								</Text>
							</Col>
						</Row>
					)}
				</Col>
			</Row>
		</>
	);
};
