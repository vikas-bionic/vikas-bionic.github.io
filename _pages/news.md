---
title: "News & Updates"
permalink: /news/
layout: single
author_profile: true
---

<ul class="news-widget__list">
{% assign news_items = site.data.news | sort: "date" | reverse %}
{% for item in news_items %}
  <li class="news-widget__item">
    <i class="fas {{ item.icon | default: 'fa-circle-dot' }} news-widget__icon" aria-hidden="true"></i>
    <div class="news-widget__content">
      <a href="{{ item.url }}" class="news-widget__link">{{ item.title }}</a>
      {% if item.date %}<span class="news-widget__date">{{ item.date | date: "%b %Y" }}</span>{% endif %}
    </div>
  </li>
{% endfor %}
</ul>
