export default function ({ $services, route, redirect }) {
  try {
    $services.navigation.navigate(route.path);
  } catch (err) {
    console.log(err.message);
    redirect("/");
  }
}
