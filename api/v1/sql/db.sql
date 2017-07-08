/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
/*Table structure for table `content` */

DROP TABLE IF EXISTS `content`;

CREATE TABLE `content` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content_section_id` int(11) NOT NULL,
  `parameter_id` int(11) NOT NULL DEFAULT '0',
  `value` varchar(255) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `FK__parameter` (`parameter_id`),
  KEY `FK_content_content_section` (`content_section_id`),
  CONSTRAINT `FK__parameter` FOREIGN KEY (`parameter_id`) REFERENCES `parameter` (`id`),
  CONSTRAINT `FK_content_content_section` FOREIGN KEY (`content_section_id`) REFERENCES `content_section` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='tabulka s obsahy sekcí';

/*Table structure for table `content_section` */

DROP TABLE IF EXISTS `content_section`;

CREATE TABLE `content_section` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `section_id` int(11) NOT NULL DEFAULT '0',
  `date_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `FK__section_content` (`section_id`),
  CONSTRAINT `FK__section_content` FOREIGN KEY (`section_id`) REFERENCES `section` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `parameter` */

DROP TABLE IF EXISTS `parameter`;

CREATE TABLE `parameter` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '0' COMMENT 'název parametru',
  `type` enum('string','enum') NOT NULL COMMENT 'typ parametru',
  `identificator` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Tabulka s definovanými parametry';

/*Table structure for table `parameter_enum` */

DROP TABLE IF EXISTS `parameter_enum`;

CREATE TABLE `parameter_enum` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '0',
  `parameter_id` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `FK__parameter_enum` (`parameter_id`),
  CONSTRAINT `FK__parameter_enum` FOREIGN KEY (`parameter_id`) REFERENCES `parameter` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='výčtové hodnoty parametrů';

/*Table structure for table `section` */

DROP TABLE IF EXISTS `section`;

CREATE TABLE `section` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL COMMENT 'název sekce',
  `identificator` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='tabulka se sekcemi';

/*Table structure for table `section_parameter` */

DROP TABLE IF EXISTS `section_parameter`;

CREATE TABLE `section_parameter` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `section_id` int(11) NOT NULL DEFAULT '0',
  `parameter_id` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `FK__section_p` (`section_id`),
  KEY `FK__parameter_p` (`parameter_id`),
  CONSTRAINT `FK__parameter_p` FOREIGN KEY (`parameter_id`) REFERENCES `parameter` (`id`),
  CONSTRAINT `FK__section_p` FOREIGN KEY (`section_id`) REFERENCES `section` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='přiřazení parametrů k sekcím';

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
