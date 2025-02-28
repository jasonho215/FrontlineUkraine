variable "environment_name" {
  type = string
}

variable "container_registry_name" {
  type    = string
  default = "frontlineacr2"
}

variable "container_image_name" {
  type    = string
  default = "web"
}

variable "public_web_image_name" {
  type    = string
  default = "public-web"
}

variable "core_image_name" {
  type    = string
  default = "core"
}

variable "public_web_image_tag" {
  type = string
}

variable "container_image_tag" {
  type = string
}

variable "core_image_tag" {
  type = string
}

variable "sql_admin_login" {
  type    = string
  default = "frontline"
}

variable "sql_admin_password" {
  type      = string
  sensitive = true
}

variable "core_custom_domain_list" {
  type = list(string)
}

variable "core_server_host" {
  type    = string
}

variable "core_cors_allowed_origins" {
  type = list(string)
}

variable "core_api_key" {
  type    = string
  default = "DUMMY"
}

variable "web_custom_domain_list" {
  type = list(string)
}

variable "publicweb_custom_domain_list" {
  type = list(string)
}

variable "publicweb_public_url" {
  type = string
}

variable "publicweb_api_endpoint" {
  type = string
}

variable "mapbox_token" {
  type = string
}

variable "contentful_delivery_access_token" {
  type = string
}

variable "contentful_space_id" {
  type = string
}

variable "contentful_environment" {
  type = string
}

variable "posttag_endpoint" {
  type = string
}

variable "posttag_id" {
  type = string
}

variable "posttag_api_key" {
  type = string
}
