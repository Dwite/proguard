package controllers

import java.io.{File, InputStream}

import play.api.Play
import play.api.Play.current
import play.api.libs.json.Json
import play.api.mvc.{Action, Controller}


/**
  * Created by valery.kuznetsov on 09-Dec-15.
  */
class Proguard extends Controller {

  val proguardFolder = "/public/proguards/"
  val proguardSuffix = "proguard-"
  val proguardExtension = ".pro"
  val proguardList = "list.txt"
  val title = "# Created by https://proguard.herokuapp.com/api/\n\n%s"

  def proguard(libraryName: String) = Action {
    val libraries = libraryName.split(',')
    val result = libraries
      .map(el => Play.resourceAsStream(proguardFolder + proguardSuffix + el + proguardExtension))
      .filter(_.isDefined)
      .map(el => readFile(el.get)) mkString "\n\n"

    Ok(title.format(result))
  }

  def list() = Action {
    Ok(Json.toJson(listInDir))
  }

  private def listInDir : Array[String] = {
    readFile(Play.resourceAsStream(proguardFolder + proguardList).get)
      .split("\r\n")
      .map(_.replace(proguardExtension, "").replace(proguardSuffix, ""))
  }

  def getListOfFiles(dir: File): List[File] = {
    dir.listFiles.toList
  }

  def readFile(stream: InputStream): String = {
    val source = scala.io.Source.fromInputStream(stream)
    val lines = try source.mkString finally source.close()
    lines
  }
}
