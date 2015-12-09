package controllers

import java.io.File

import play.api.Play
import play.api.Play.current
import play.api.libs.json.Json
import play.api.mvc.{Action, Controller}


/**
  * Created by dwite_000 on 09-Dec-15.
  */
class Proguard extends Controller {

  val proguardFolder = "/public/proguards/"
  val proguardSuffix = "proguard-"
  val proguardExtension = ".pro"

  def proguard(libraryName: String) = Action {
    val libraries = libraryName.split(',')
    if (libraries.length > 0) {
      val resultProguard = s"\n# Created by https://www.proguard.io/api/$libraryName\n"
      Ok(resultProguard + "\n" + (listInDir(proguardFolder).filter(libraries.contains(_)).map(readFile) mkString "\n"))
    } else {
      Ok(views.html.proguard(""))
    }
  }

  def list() = Action {
    Ok(Json.toJson(listInDir(proguardFolder)))
  }

  private def listInDir(filePath: String): List[String] = {
    getListOfFiles(Play.getFile(filePath)).map(_.getName.replace(proguardExtension, "").replace(proguardSuffix, ""))
  }

  def getListOfFiles(dir: File): List[File] = {
    dir.listFiles.filter(_.isFile).toList
  }

  def readFile(string: String): String = {
    val source = scala.io.Source.fromFile(Play.getFile(s"$proguardFolder$proguardSuffix$string$proguardExtension"))
    val lines = try source.mkString finally source.close()
    lines
  }

}
