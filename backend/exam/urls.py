from django.urls import path
from .views import ExamBillView


# get the url and decleared the class ExamBillView
urlpatterns = [
    path("exam-bill/", ExamBillView.as_view(), name="exam-bill"),
]
