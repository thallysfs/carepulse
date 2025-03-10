import { StatusIcon } from "@/constants";
import clsx from "clsx";
import Image from "next/image";

const StatusBadge = ({ status }: { status: Status }) => {
  let portugueseStatus;
  switch (status) {
    case "scheduled":
      portugueseStatus = "Agendado";
      break;
    case "pending":
      portugueseStatus = "Pendente";
      break;
    case "cancelled":
      portugueseStatus = "Cancelado";
      break;
  }

  return (
    <div
      className={clsx("status-badge", {
        "bg-green-600": status === "scheduled",
        "bg-blue-600": status === "pending",
        "bg-red-600": status === "cancelled",
      })}
    >
      <Image
        src={StatusIcon[status]}
        alt={status}
        height={24}
        width={24}
        className="w-3 h-fit"
      />
      <p
        className={clsx("text-12-semibold capitalize", {
          "text-green-500": status === "scheduled",
          "text-blue-500": status === "pending",
          "text-red-500": status === "cancelled",
        })}
      >
        {portugueseStatus}
      </p>
    </div>
  );
};

export default StatusBadge;
