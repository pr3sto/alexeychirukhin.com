export default function ({ $services, route, redirect }) {
  if (!$services.menu.hasRoute(route.path)) {
    redirect("/");
  }
}
