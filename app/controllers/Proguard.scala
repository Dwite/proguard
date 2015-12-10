package controllers

import java.io.{InputStream, File}

import play.api.Play
import play.api.Play.current
import play.api.libs.json.Json
import play.api.mvc.{Action, Controller}


/**
  * Created by dwite_000 on 09-Dec-15.
  */
class Proguard extends Controller {

  val proguardFolder = "/public/proguards/"
  val proguardFolderFix = "/public/proguards"
  val proguardSuffix = "proguard-"
  val proguardExtension = ".pro"
  val title = "# Created by https://www.proguard.io/api/\n\n"

  def proguard(libraryName: String) = Action {
    val libraries = libraryName.split(',')
    var result = title
    for (el <- libraries) {
      result = result + readFile(Play.resourceAsStream("public/proguards/" + proguardSuffix + el + proguardExtension).get)
    }
    Ok(result)
  }


  def list() = Action {
    Ok(Json.toJson(listInDir(proguardFolder)))
  }

  private def listInDir(filePath: String): List[String] = {
    getListOfFiles(Play.application.getFile(filePath)).map(_.getName.replace(proguardExtension, "").replace(proguardSuffix, ""))
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
