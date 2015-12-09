package controllers

import play.api.mvc._

class Application extends Controller {

  def index = Action {
    Ok(views.html.index("Proguard application."))
  }

  def proguard(libraryName : String) = Action {
    Ok(views.html.proguard(libraryName))
  }
}
