class CatsController < ApplicationController
  def index
    @cats = Cat.all
  end

  def show
    @cats = Cat.find(params[:id])
  end

  def new
    @cat = Cat.new
  end

  def create
    @cats = Cat.create(name: params[:name], gender: params[:gender], breed: params[:breed], allergies: params[:allergies], mood: params[:mood], available: false, user_id: params[:id])
  end

end