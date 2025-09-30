from django.urls import path
from .views import ExamBillView

urlpatterns = [
    path("exam-bill/", ExamBillView.as_view(), name="exam-bill"),
]
