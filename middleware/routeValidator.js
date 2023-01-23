export default function ({ $services, route, redirect }) {
  if (!$services.menu.isValidPageRoute(route.path)) {
    redirect("/");
  }
}
