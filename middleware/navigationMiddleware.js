export default function ({ $services, route, redirect }) {
  try {
    $services.appState.nextRoute(route.path);
  } catch (err) {
    redirect("/");
  }
}
