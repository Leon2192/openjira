import mongoose from "mongoose";

const mongooseConnection = {
  isConnected: 0,
};

export const connect = async () => {
  if (mongooseConnection.isConnected) {
    console.log("Ya estamos conectados.");
    return;
  }

  if (mongoose.connections.length > 0) {
    mongooseConnection.isConnected = mongoose.connections[0].readyState;

    if (mongooseConnection.isConnected === 1) {
      console.log("Usando conexion anterior");
      return;
    }

    await mongoose.disconnect();
  }

  await mongoose.connect(process.env.MONGO_URL || "");
  mongooseConnection.isConnected = 1;
  console.log("Conectado a MongoDB:", process.env.MONGO_URL);
};

export const disconnect = async () => {
  if (process.env.NODE_ENV === "development") return;

  if (mongooseConnection.isConnected === 0) return;

  await mongoose.disconnect();
  console.log("Desconectado de MongoDB");
};
