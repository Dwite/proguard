package controllers

import java.io.File

import play.api.Play
import play.api.Play.current
import play.api.mvc.{Action, Controller}


/**
  * Created by dwite_000 on 09-Dec-15.
  */
class Proguard extends Controller {

  def proguard(libraryName : String) = Action {
    Ok(views.html.proguard(libraryName))
  }

  def list() = Action {
    Ok(listInDir("/public/proguards"))
  }
  private def listInDir(filePath : String) : String = {
    getListOfFiles(Play.getFile(filePath)).map(_.getName) mkString "\r\n"
  }

  private def getListOfFiles(dir: File) : List[File] = {
    dir.listFiles.filter(_.isFile).toList
  }

}
