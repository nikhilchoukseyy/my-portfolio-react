import { CiLinkedin } from "react-icons/ci";
import { FaGithub } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

export const SOCIAL_LINKS = [
  {
    id: 'github',
    label: 'Github',
    url: 'https://github.com/nikhilchoukseyy',
    ariaLabel: 'GitHub Profile',
    icon: FaGithub
  },
  {
    id: 'linkedin',
    label: 'Linkedin',
    url: 'https://www.linkedin.com/in/nikhilchoukseyy',
    ariaLabel: 'LinkedIn Profile',
    icon: CiLinkedin
  },
  {
    id: 'leetcode',
    label: 'Leetcode',
    url: 'https://leetcode.com/u/nikhilchouksey/',
    ariaLabel: 'LeetCode Profile',
    icon: SiLeetcode
  }
]
