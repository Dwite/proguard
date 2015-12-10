package controllers

import java.io.{InputStream, File}

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
  val title = "# Created by https://www.proguard.io/api/\n\n"

  def proguard(libraryName: String) = Action {
    val libraries = libraryName.split(',')
    var result = title
    for (el <- libraries) {
      val resourceStream = Play.resourceAsStream(proguardFolder + proguardSuffix + el + proguardExtension)
      if (resourceStream.isDefined) {
        result += readFile(resourceStream.get)
      }
    }
    Ok(result)
  }


  def list() = Action {
    Ok(Json.toJson(listInDir(proguardFolder)))
  }

  private def listInDir(filePath: String): Array[String] = {
    readFile(Play.resourceAsStream(proguardFolder + proguardList).get)
      .split("\r\n")
      .map(_.replace(proguardExtension, "")
        .replace(proguardSuffix, ""))
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
