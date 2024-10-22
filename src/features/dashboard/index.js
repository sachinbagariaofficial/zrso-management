import DashboardStats from "./components/DashboardStats";
import AmountStats from "./components/AmountStats";
import PageStats from "./components/PageStats";

import UserGroupIcon from "@heroicons/react/24/outline/UserGroupIcon";
import UsersIcon from "@heroicons/react/24/outline/UsersIcon";
import CircleStackIcon from "@heroicons/react/24/outline/CircleStackIcon";
import CreditCardIcon from "@heroicons/react/24/outline/CreditCardIcon";
import UserChannels from "./components/UserChannels";
import LineChart from "./components/LineChart";
import BarChart from "./components/BarChart";
import DashboardTopBar from "./components/DashboardTopBar";
import { useDispatch, useSelector } from "react-redux";
import { showNotification } from "../common/headerSlice";
import DoughnutChart from "./components/DoughnutChart";
import { useEffect, useState } from "react";
import TitleCard from "../../components/Cards/TitleCard";
import { TopSideButtons } from "../../utils/topSideButtons";
import { getLeadsContent } from "../leads/leadSlice";
import { openModal } from "../common/modalSlice";
import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_BODY_TYPES,
} from "../../utils/globalConstantUtil";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import moment from "moment";

const statsData = [
  {
    title: "Total Items",
    value: "3452",
    icon: <CircleStackIcon className="w-8 h-8" />,
    description: "↗︎ 2300 (22%)",
  },
  {
    title: "Total Sales",
    value: "$34,545",
    icon: <CreditCardIcon className="w-8 h-8" />,
    description: "Current month",
  },
  {
    title: "Pending Leads",
    value: "450",
    icon: <CircleStackIcon className="w-8 h-8" />,
    description: "50 in hot leads",
  },
  {
    title: "Active Users",
    value: "5.6k",
    icon: <UsersIcon className="w-8 h-8" />,
    description: "↙ 300 (18%)",
  },
];

function Dashboard() {
  const dispatch = useDispatch();

  const updateDashboardPeriod = (newRange) => {
    // Dashboard range changed, write code to refresh your values
    dispatch(
      showNotification({
        message: `Period updated to ${newRange.startDate} to ${newRange.endDate}`,
        status: 1,
      })
    );
  };

  const { leads } = useSelector((state) => state.lead);

  useEffect(() => {
    dispatch(getLeadsContent());
  }, []);

  const deleteCurrentLead = (index) => {
    dispatch(
      openModal({
        title: "Confirmation",
        bodyType: MODAL_BODY_TYPES.CONFIRMATION,
        extraObject: {
          message: `Are you sure you want to delete this lead?`,
          type: CONFIRMATION_MODAL_CLOSE_TYPES.LEAD_DELETE,
          index,
        },
      })
    );
  };

  const Dummy_Data = [
    {
      id: 1,
      name: "Paracetamol",
      company: "Cipla",
      totalQuantity: 200,
      availableQuantity: 81,
      expireDate: "25/07/2026",
    },
  ];

  const [productList, setProductList] = useState(Dummy_Data);

  return (
    <>
      {/** ---------------------- Select Period Content ------------------------- */}
      <DashboardTopBar updateDashboardPeriod={updateDashboardPeriod} />

      {/** ---------------------- Different stats content 1 ------------------------- */}
      <div className="grid lg:grid-cols-4 mt-2 md:grid-cols-2 grid-cols-1 gap-6">
        {statsData.map((d, k) => {
          return <DashboardStats key={k} {...d} colorIndex={k} />;
        })}
      </div>
      <div className="mt-7">
        <TitleCard
          title="Current Leads"
          topMargin="mt-2"
          TopSideButtons={<TopSideButtons />}
        >
          {/* Leads List in table format loaded from slice after api call */}
          <div className="overflow-x-auto w-full">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Item No.</th>
                  <th>Product</th>
                  <th>Company</th>
                  <th>Quantity</th>
                  <th>Expire Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {(leads.length > 0 &&
                  leads?.map((list, index) => {
                    return (
                      <tr key={list.id}>
                        <td>{index + 1}</td>
                        <td className="font-bold"> {list.name}</td>
                        <td>{list.company}</td>
                        <td>{`${list.availableQuantity}/${list.totalQuantity}`}</td>
                        <td>{list.expireDate}</td>

                        <td className="flex gap-3">
                          <button className="hover:text-blue-500">
                            <PencilSquareIcon className="w-5" />
                          </button>
                          <button
                            className="hover:text-red-500"
                            onClick={() => deleteCurrentLead(list.id)}
                          >
                            <TrashIcon className="w-5" />
                          </button>
                        </td>
                      </tr>
                    );
                  })) || <p>No Data</p>}
              </tbody>
            </table>
          </div>
        </TitleCard>
      </div>
    </>
  );
}

export default Dashboard;
