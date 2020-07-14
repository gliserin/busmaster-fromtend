import axios from "./axios";

export async function register(name, id, password) {
  return (
    await axios.post(
      `/user/signup`,
      {
        name,
        id,
        password,
      },
      { withCredentials: true }
    )
  ).data;
}

export async function login(id, password) {
  return (
    await axios.post(
      `/user/login`,
      {
        id,
        password,
      },
      { withCredentials: true }
    )
  ).data;
}

export async function logout() {
  return (await axios.post(`/user/logout`, {}, { withCredentials: true })).data;
}

export async function check() {
  return (await axios.get(`/user/check`, { withCredentials: true })).data;
}

export async function resign(id) {
  return await axios.post(`/user/resign`, { id }, { withCredentials: true });
}

export async function getBus() {
  return (await axios.get(`/bus`, { withCredentials: true })).data;
}

export async function getRecentBus() {
  return (await axios.get(`/bus/recent`, { withCredentials: true })).data;
}

export async function postBus(location, route, number, type, year) {
  return (
    await axios.post(
      `/bus`,
      {
        location,
        route,
        number,
        type,
        year,
      },
      { withCredentials: true }
    )
  ).data;
}

export async function putBus(id, location, route, number, type, year) {
  return (
    await axios.put(
      `/bus/${id}`,
      {
        location,
        route,
        number,
        type,
        year,
      },
      { withCredentials: true }
    )
  ).data;
}

export async function deleteBus(id) {
  return (await axios.delete(`/bus/${id}`, { withCredentials: true })).data;
}

export async function myBusCount() {
  return (await axios.get(`/dashboard/mybuscount`, { withCredentials: true }))
    .data;
}

export async function myPlace() {
  return (await axios.get(`/dashboard/myplace`, { withCredentials: true }))
    .data;
}

export async function ranking() {
  return (await axios.get(`/dashboard/ranking`, { withCredentials: true }))
    .data;
}
