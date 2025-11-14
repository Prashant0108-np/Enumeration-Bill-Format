from django.urls import path
from .views import ExamBillView,UserDataView,AdminExamBillList,DeleteExamBillView,AddRemarkView,UpdateExamBillView



# get the url and decleared the class ExamBillView
urlpatterns = [
    path("exam-bill/", ExamBillView.as_view(), name="exam-bill"),
    path("user-data/", UserDataView.as_view(), name="user-data"),  # ✅ Add this
    path("admin/exam-bills/", AdminExamBillList.as_view(), name="admin-exam-bills"),
    path("exam-bill/delete/<str:doc_id>/", DeleteExamBillView.as_view(), name="delete-exam-bill"),
    path("exam-bill/remark/<str:doc_id>/", AddRemarkView.as_view(), name="exam-bill-remark"),
    path("exam-bill/update/<str:doc_id>/", UpdateExamBillView.as_view(), name="update_bill"),
]
